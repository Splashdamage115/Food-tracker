const { getDb } = require('../config/database');

const userController = {
  // Get user profile with goals
  getProfile: (req, res) => {
    const db = getDb();
    const userId = req.userId;

    const query = `
      SELECT u.id, u.email, u.name, u.created_at,
             ug.daily_calories_goal, ug.daily_protein_goal, 
             ug.daily_carbs_goal, ug.daily_fat_goal
      FROM users u
      LEFT JOIN user_goals ug ON u.id = ug.user_id
      WHERE u.id = ?
    `;

    db.get(query, [userId], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
        goals: {
          dailyCaloriesGoal: user.daily_calories_goal || 2000,
          dailyProteinGoal: user.daily_protein_goal || 100,
          dailyCarbsGoal: user.daily_carbs_goal || 250,
          dailyFatGoal: user.daily_fat_goal || 70
        }
      });
    });
  },

  // Update user goals
  updateGoals: (req, res) => {
    const db = getDb();
    const userId = req.userId;
    const { dailyCaloriesGoal, dailyProteinGoal, dailyCarbsGoal, dailyFatGoal } = req.body;

    // Check if goals exist
    db.get('SELECT * FROM user_goals WHERE user_id = ?', [userId], (err, existing) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (existing) {
        // Update existing goals
        const updates = [];
        const params = [];

        if (dailyCaloriesGoal !== undefined) {
          updates.push('daily_calories_goal = ?');
          params.push(dailyCaloriesGoal);
        }
        if (dailyProteinGoal !== undefined) {
          updates.push('daily_protein_goal = ?');
          params.push(dailyProteinGoal);
        }
        if (dailyCarbsGoal !== undefined) {
          updates.push('daily_carbs_goal = ?');
          params.push(dailyCarbsGoal);
        }
        if (dailyFatGoal !== undefined) {
          updates.push('daily_fat_goal = ?');
          params.push(dailyFatGoal);
        }

        if (updates.length === 0) {
          return res.status(400).json({ error: 'No goals to update' });
        }

        updates.push('updated_at = CURRENT_TIMESTAMP');
        params.push(userId);

        db.run(
          `UPDATE user_goals SET ${updates.join(', ')} WHERE user_id = ?`,
          params,
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Error updating goals' });
            }

            // Return updated goals
            db.get('SELECT * FROM user_goals WHERE user_id = ?', [userId], (err, goals) => {
              if (err) {
                return res.status(500).json({ error: 'Database error' });
              }

              res.json({
                dailyCaloriesGoal: goals.daily_calories_goal,
                dailyProteinGoal: goals.daily_protein_goal,
                dailyCarbsGoal: goals.daily_carbs_goal,
                dailyFatGoal: goals.daily_fat_goal
              });
            });
          }
        );
      } else {
        // Create new goals
        db.run(
          'INSERT INTO user_goals (user_id, daily_calories_goal, daily_protein_goal, daily_carbs_goal, daily_fat_goal) VALUES (?, ?, ?, ?, ?)',
          [userId, dailyCaloriesGoal || 2000, dailyProteinGoal || 100, dailyCarbsGoal || 250, dailyFatGoal || 70],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Error creating goals' });
            }

            res.json({
              dailyCaloriesGoal: dailyCaloriesGoal || 2000,
              dailyProteinGoal: dailyProteinGoal || 100,
              dailyCarbsGoal: dailyCarbsGoal || 250,
              dailyFatGoal: dailyFatGoal || 70
            });
          }
        );
      }
    });
  }
};

module.exports = userController;
