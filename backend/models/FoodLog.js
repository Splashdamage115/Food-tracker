const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  servings: {
    type: Number,
    required: [true, 'Servings are required'],
    min: 0.01
  },
  mealType: {
    type: String,
    required: [true, 'Meal type is required'],
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    lowercase: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  notes: {
    type: String,
    trim: true
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

// Index for efficient queries
foodLogSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('FoodLog', foodLogSchema);
