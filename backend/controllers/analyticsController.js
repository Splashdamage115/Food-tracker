const FoodLog = require('../models/FoodLog');

// @desc    Get weekly summary
// @route   GET /api/analytics/weekly
// @access  Private
exports.getWeeklySummary = async (req, res, next) => {
  try {
    const { startDate } = req.query;

    if (!startDate) {
      return res.status(400).json({ error: { message: 'startDate parameter is required' } });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const logs = await FoodLog.find({
      user: req.user._id,
      date: {
        $gte: start,
        $lt: end
      }
    }).populate('food');

    // Aggregate by day
    const dailyData = {};
    
    logs.forEach(log => {
      const dateKey = log.date.toISOString().split('T')[0];
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        };
      }

      dailyData[dateKey].calories += log.food.calories * log.servings;
      dailyData[dateKey].protein += log.food.protein * log.servings;
      dailyData[dateKey].carbs += log.food.carbs * log.servings;
      dailyData[dateKey].fat += log.food.fat * log.servings;
    });

    res.status(200).json({ startDate, endDate: end, dailyData });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly summary
// @route   GET /api/analytics/monthly
// @access  Private
exports.getMonthlySummary = async (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: { message: 'month parameter is required (format: YYYY-MM)' } });
    }

    const [year, monthNum] = month.split('-');
    const start = new Date(year, monthNum - 1, 1);
    const end = new Date(year, monthNum, 0, 23, 59, 59, 999);

    const logs = await FoodLog.find({
      user: req.user._id,
      date: {
        $gte: start,
        $lte: end
      }
    }).populate('food');

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let daysWithLogs = new Set();

    logs.forEach(log => {
      totalCalories += log.food.calories * log.servings;
      totalProtein += log.food.protein * log.servings;
      totalCarbs += log.food.carbs * log.servings;
      totalFat += log.food.fat * log.servings;
      daysWithLogs.add(log.date.toISOString().split('T')[0]);
    });

    const averages = {
      avgCalories: daysWithLogs.size > 0 ? totalCalories / daysWithLogs.size : 0,
      avgProtein: daysWithLogs.size > 0 ? totalProtein / daysWithLogs.size : 0,
      avgCarbs: daysWithLogs.size > 0 ? totalCarbs / daysWithLogs.size : 0,
      avgFat: daysWithLogs.size > 0 ? totalFat / daysWithLogs.size : 0
    };

    res.status(200).json({
      month,
      totals: { totalCalories, totalProtein, totalCarbs, totalFat },
      averages,
      daysTracked: daysWithLogs.size
    });
  } catch (error) {
    next(error);
  }
};
