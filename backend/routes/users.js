const express = require('express');
const router = express.Router();
const { getProfile, updateGoals } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.put('/goals', protect, updateGoals);

module.exports = router;
