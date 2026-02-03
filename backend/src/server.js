require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./config/database');
const { seedDatabase } = require('./db/seed');

// Import routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/foods');
const foodLogRoutes = require('./routes/foodLogs');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/food-logs', foodLogRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Food Tracker API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        validate: 'GET /api/auth/validate'
      },
      foods: {
        search: 'GET /api/foods/search?query=apple&limit=20',
        getById: 'GET /api/foods/:id',
        create: 'POST /api/foods'
      },
      foodLogs: {
        create: 'POST /api/food-logs',
        getByDate: 'GET /api/food-logs?date=2026-02-03',
        update: 'PUT /api/food-logs/:id',
        delete: 'DELETE /api/food-logs/:id'
      },
      users: {
        profile: 'GET /api/users/profile',
        updateGoals: 'PUT /api/users/goals'
      }
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Seed database and start server
initializeDatabase()
  .then(() => seedDatabase())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`API Documentation available at http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    process.exit(1);
  });

module.exports = app;
