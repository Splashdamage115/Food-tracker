const express = require('express');
const router = express.Router();
const { getWeeklySummary, getMonthlySummary } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/weekly', protect, getWeeklySummary);
router.get('/monthly', protect, getMonthlySummary);

module.exports = router;
