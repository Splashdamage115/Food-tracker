const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  servingSize: {
    type: String,
    required: [true, 'Serving size is required']
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: 0
  },
  protein: {
    type: Number,
    required: [true, 'Protein is required'],
    min: 0
  },
  carbs: {
    type: Number,
    required: [true, 'Carbs are required'],
    min: 0
  },
  fat: {
    type: Number,
    required: [true, 'Fat is required'],
    min: 0
  },
  fiber: {
    type: Number,
    default: 0,
    min: 0
  },
  sugar: {
    type: Number,
    default: 0,
    min: 0
  },
  sodium: {
    type: Number,
    default: 0,
    min: 0
  },
  source: {
    type: String,
    enum: ['internal', 'usda', 'nutritionix', 'openfoodfacts'],
    default: 'internal'
  },
  externalId: {
    type: String
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

// Index for search
foodSchema.index({ name: 'text', brand: 'text' });

module.exports = mongoose.model('Food', foodSchema);
