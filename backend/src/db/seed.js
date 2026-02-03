const { getDb } = require('../config/database');

const seedFoods = [
  {
    name: 'Apple',
    brand: 'Fresh',
    serving_size: '100g',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10.4,
    sodium: 1,
    source: 'internal'
  },
  {
    name: 'Banana',
    brand: 'Fresh',
    serving_size: '100g',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    sodium: 1,
    source: 'internal'
  },
  {
    name: 'Chicken Breast',
    brand: 'Generic',
    serving_size: '100g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    source: 'internal'
  },
  {
    name: 'Brown Rice',
    brand: 'Generic',
    serving_size: '100g',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    source: 'internal'
  },
  {
    name: 'Broccoli',
    brand: 'Fresh',
    serving_size: '100g',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.7,
    sodium: 33,
    source: 'internal'
  },
  {
    name: 'Eggs',
    brand: 'Generic',
    serving_size: '1 large (50g)',
    calories: 72,
    protein: 6.3,
    carbs: 0.4,
    fat: 4.8,
    fiber: 0,
    sugar: 0.2,
    sodium: 71,
    source: 'internal'
  },
  {
    name: 'Salmon',
    brand: 'Atlantic',
    serving_size: '100g',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    source: 'internal'
  },
  {
    name: 'Greek Yogurt',
    brand: 'Plain',
    serving_size: '100g',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    sugar: 3.2,
    sodium: 36,
    source: 'internal'
  },
  {
    name: 'Oatmeal',
    brand: 'Rolled Oats',
    serving_size: '100g',
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fat: 6.9,
    fiber: 10.6,
    sugar: 0,
    sodium: 2,
    source: 'internal'
  },
  {
    name: 'Almonds',
    brand: 'Raw',
    serving_size: '100g',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12.5,
    sugar: 4.4,
    sodium: 1,
    source: 'internal'
  },
  {
    name: 'Spinach',
    brand: 'Fresh',
    serving_size: '100g',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    source: 'internal'
  },
  {
    name: 'Sweet Potato',
    brand: 'Fresh',
    serving_size: '100g',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    fiber: 3,
    sugar: 4.2,
    sodium: 55,
    source: 'internal'
  },
  {
    name: 'Avocado',
    brand: 'Fresh',
    serving_size: '100g',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    sugar: 0.7,
    sodium: 7,
    source: 'internal'
  },
  {
    name: 'Tuna',
    brand: 'Canned in Water',
    serving_size: '100g',
    calories: 116,
    protein: 25.5,
    carbs: 0,
    fat: 0.8,
    fiber: 0,
    sugar: 0,
    sodium: 247,
    source: 'internal'
  },
  {
    name: 'Quinoa',
    brand: 'Cooked',
    serving_size: '100g',
    calories: 120,
    protein: 4.4,
    carbs: 21,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 7,
    source: 'internal'
  }
];

function seedDatabase() {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) as count FROM foods', [], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count > 0) {
        console.log('Database already seeded, skipping...');
        resolve();
        return;
      }

      console.log('Seeding database with initial food data...');
      
      const stmt = db.prepare(`
        INSERT INTO foods (name, brand, serving_size, calories, protein, carbs, fat, fiber, sugar, sodium, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      seedFoods.forEach((food) => {
        stmt.run(
          food.name,
          food.brand,
          food.serving_size,
          food.calories,
          food.protein,
          food.carbs,
          food.fat,
          food.fiber,
          food.sugar,
          food.sodium,
          food.source
        );
      });

      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Seeded ${seedFoods.length} food items successfully.`);
          resolve();
        }
      });
    });
  });
}

module.exports = { seedDatabase };
