const express = require('express');
const router = express.Router();
const { searchFoods, getFoodById, createFood } = require('../controllers/foodController');
const { protect } = require('../middleware/auth');

router.get('/search', protect, searchFoods);
router.get('/:id', protect, getFoodById);
router.post('/', protect, createFood);

module.exports = router;
