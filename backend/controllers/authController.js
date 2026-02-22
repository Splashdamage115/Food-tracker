const User = require('../models/User');
const UserGoals = require('../models/UserGoals');
const { generateToken } = require('../utils/jwt');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: { message: 'User already exists' } });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name
    });

    // Create default goals for user
    await UserGoals.create({
      user: user._id
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ error: { message: 'Please provide email and password' } });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate token and get user
// @route   GET /api/auth/validate
// @access  Private
exports.validate = async (req, res, next) => {
  try {
    res.status(200).json({
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    });
  } catch (error) {
    next(error);
  }
};
