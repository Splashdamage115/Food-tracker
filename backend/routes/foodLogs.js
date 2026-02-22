const express = require('express');
const router = express.Router();
const {
  createFoodLog,
  getFoodLogs,
  updateFoodLog,
  deleteFoodLog
} = require('../controllers/foodLogController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createFoodLog);
router.get('/', protect, getFoodLogs);
router.put('/:id', protect, updateFoodLog);
router.delete('/:id', protect, deleteFoodLog);

module.exports = router;
