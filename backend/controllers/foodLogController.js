const FoodLog = require('../models/FoodLog');
const Food = require('../models/Food');

// @desc    Create food log entry
// @route   POST /api/food-logs
// @access  Private
exports.createFoodLog = async (req, res, next) => {
  try {
    const { foodId, servings, mealType, date, notes } = req.body;

    // Verify food exists
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: { message: 'Food not found' } });
    }

    const foodLog = await FoodLog.create({
      user: req.user._id,
      food: foodId,
      servings,
      mealType,
      date: date || new Date(),
      notes
    });

    const populatedLog = await FoodLog.findById(foodLog._id).populate('food');

    res.status(201).json(populatedLog);
  } catch (error) {
    next(error);
  }
};

// @desc    Get food logs for a date
// @route   GET /api/food-logs
// @access  Private
exports.getFoodLogs = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: { message: 'Date parameter is required' } });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const logs = await FoodLog.find({
      user: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('food').sort({ createdAt: 1 });

    // Calculate daily summary
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    const entries = logs.map(log => {
      const servings = log.servings;
      const calories = log.food.calories * servings;
      const protein = log.food.protein * servings;
      const carbs = log.food.carbs * servings;
      const fat = log.food.fat * servings;

      totalCalories += calories;
      totalProtein += protein;
      totalCarbs += carbs;
      totalFat += fat;

      return {
        id: log._id,
        food: log.food,
        servings: log.servings,
        mealType: log.mealType,
        totalCalories: calories,
        totalProtein: protein,
        totalCarbs: carbs,
        totalFat: fat,
        notes: log.notes,
        timestamp: log.createdAt
      };
    });

    res.status(200).json({
      date,
      entries,
      dailySummary: {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update food log entry
// @route   PUT /api/food-logs/:id
// @access  Private
exports.updateFoodLog = async (req, res, next) => {
  try {
    let foodLog = await FoodLog.findById(req.params.id);

    if (!foodLog) {
      return res.status(404).json({ error: { message: 'Food log not found' } });
    }

    // Check ownership
    if (foodLog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: { message: 'Not authorized to update this log' } });
    }

    foodLog = await FoodLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('food');

    res.status(200).json(foodLog);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete food log entry
// @route   DELETE /api/food-logs/:id
// @access  Private
exports.deleteFoodLog = async (req, res, next) => {
  try {
    const foodLog = await FoodLog.findById(req.params.id);

    if (!foodLog) {
      return res.status(404).json({ error: { message: 'Food log not found' } });
    }

    // Check ownership
    if (foodLog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: { message: 'Not authorized to delete this log' } });
    }

    await foodLog.deleteOne();

    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
