const Food = require('../models/Food');

// @desc    Search foods
// @route   GET /api/foods/search
// @access  Private
exports.searchFoods = async (req, res, next) => {
  try {
    const { query, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({ error: { message: 'Query parameter is required' } });
    }

    const foods = await Food.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ]
    }).limit(parseInt(limit));

    res.status(200).json({ foods });
  } catch (error) {
    next(error);
  }
};

// @desc    Get food by ID
// @route   GET /api/foods/:id
// @access  Private
exports.getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ error: { message: 'Food not found' } });
    }

    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new food item (admin)
// @route   POST /api/foods
// @access  Private
exports.createFood = async (req, res, next) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
};
