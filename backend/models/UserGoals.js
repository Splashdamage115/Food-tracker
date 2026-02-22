const mongoose = require('mongoose');

const userGoalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  dailyCaloriesGoal: {
    type: Number,
    default: 2000,
    min: 0
  },
  dailyProteinGoal: {
    type: Number,
    default: 100,
    min: 0
  },
  dailyCarbsGoal: {
    type: Number,
    default: 250,
    min: 0
  },
  dailyFatGoal: {
    type: Number,
    default: 70,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserGoals', userGoalsSchema);
