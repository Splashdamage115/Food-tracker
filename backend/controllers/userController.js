const User = require('../models/User');
const UserGoals = require('../models/UserGoals');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const goals = await UserGoals.findOne({ user: req.user._id });

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      goals: goals || {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update nutritional goals
// @route   PUT /api/users/goals
// @access  Private
exports.updateGoals = async (req, res, next) => {
  try {
    const { dailyCaloriesGoal, dailyProteinGoal, dailyCarbsGoal, dailyFatGoal } = req.body;

    let goals = await UserGoals.findOne({ user: req.user._id });

    if (!goals) {
      goals = await UserGoals.create({
        user: req.user._id,
        dailyCaloriesGoal,
        dailyProteinGoal,
        dailyCarbsGoal,
        dailyFatGoal
      });
    } else {
      goals = await UserGoals.findOneAndUpdate(
        { user: req.user._id },
        { dailyCaloriesGoal, dailyProteinGoal, dailyCarbsGoal, dailyFatGoal },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};
