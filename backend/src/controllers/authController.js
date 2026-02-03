const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/database');

const authController = {
  // Register a new user
  register: (req, res) => {
    const db = getDb();
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: 'Error hashing password' });
      }

      // Insert user into database
      db.run(
        'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
        [email, hash, name],
        function(err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Error creating user' });
          }

          const userId = this.lastID;

          // Create default goals for the user
          db.run(
            'INSERT INTO user_goals (user_id, daily_calories_goal, daily_protein_goal, daily_carbs_goal, daily_fat_goal) VALUES (?, ?, ?, ?, ?)',
            [userId, 2000, 100, 250, 70],
            (err) => {
              if (err) {
                console.error('Error creating default goals:', err);
              }
            }
          );

          // Generate JWT token
          const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );

          res.status(201).json({
            token,
            user: {
              id: userId,
              email,
              name
            }
          });
        }
      );
    });
  },

  // Login user
  login: (req, res) => {
    const db = getDb();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare password
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Error checking password' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        });
      });
    });
  },

  // Validate token
  validate: (req, res) => {
    const db = getDb();
    // If we reach here, token is valid (middleware checked it)
    db.get('SELECT id, email, name FROM users WHERE id = ?', [req.userId], (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    });
  }
};

module.exports = authController;
