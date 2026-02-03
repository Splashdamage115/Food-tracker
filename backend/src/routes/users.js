const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.put('/goals', userController.updateGoals);

module.exports = router;
