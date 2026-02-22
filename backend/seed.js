require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/Food');
const connectDB = require('./config/database');

const sampleFoods = [
  {
    name: 'Apple',
    brand: 'Fresh',
    servingSize: '100g',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10.4,
    source: 'internal'
  },
  {
    name: 'Banana',
    brand: 'Fresh',
    servingSize: '100g',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    source: 'internal'
  },
  {
    name: 'Chicken Breast',
    brand: 'Generic',
    servingSize: '100g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    source: 'internal'
  },
  {
    name: 'Brown Rice',
    brand: 'Generic',
    servingSize: '100g',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    source: 'internal'
  },
  {
    name: 'Broccoli',
    brand: 'Fresh',
    servingSize: '100g',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.7,
    source: 'internal'
  },
  {
    name: 'Eggs',
    brand: 'Generic',
    servingSize: '1 large (50g)',
    calories: 72,
    protein: 6.3,
    carbs: 0.4,
    fat: 4.8,
    fiber: 0,
    sugar: 0.2,
    source: 'internal'
  },
  {
    name: 'Salmon',
    brand: 'Atlantic',
    servingSize: '100g',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    source: 'internal'
  },
  {
    name: 'Greek Yogurt',
    brand: 'Plain',
    servingSize: '100g',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    sugar: 3.2,
    source: 'internal'
  },
  {
    name: 'Oatmeal',
    brand: 'Rolled Oats',
    servingSize: '100g',
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fat: 6.9,
    fiber: 10.6,
    sugar: 0,
    source: 'internal'
  },
  {
    name: 'Almonds',
    brand: 'Raw',
    servingSize: '100g',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12.5,
    sugar: 4.4,
    source: 'internal'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing foods
    await Food.deleteMany({});
    console.log('Cleared existing foods');

    // Insert sample foods
    await Food.insertMany(sampleFoods);
    console.log('Sample foods added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
