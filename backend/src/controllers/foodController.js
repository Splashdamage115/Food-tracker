const { getDb } = require('../config/database');
const nutritionService = require('../services/nutritionService');

const foodController = {
  // Search foods from local database and external API
  search: async (req, res) => {
    const db = getDb();
    const { query = '', limit = 20 } = req.query;

    try {
      // Search local database
      db.all(
        'SELECT * FROM foods WHERE name LIKE ? OR brand LIKE ? LIMIT ?',
        [`%${query}%`, `%${query}%`, limit],
        async (err, localFoods) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }

          // If query is empty or we have enough results, return local results
          if (!query || localFoods.length >= limit) {
            return res.json({
              foods: localFoods.map(food => ({
                id: food.id.toString(),
                name: food.name,
                brand: food.brand,
                servingSize: food.serving_size,
                calories: food.calories,
                protein: food.protein,
                carbs: food.carbs,
                fat: food.fat,
                fiber: food.fiber,
                sugar: food.sugar,
                sodium: food.sodium,
                source: food.source
              }))
            });
          }

          // Search external API for additional results
          try {
            const externalFoods = await nutritionService.searchFoods(query, limit - localFoods.length);
            
            // Combine local and external results
            const allFoods = [
              ...localFoods.map(food => ({
                id: food.id.toString(),
                name: food.name,
                brand: food.brand,
                servingSize: food.serving_size,
                calories: food.calories,
                protein: food.protein,
                carbs: food.carbs,
                fat: food.fat,
                fiber: food.fiber,
                sugar: food.sugar,
                sodium: food.sodium,
                source: food.source
              })),
              ...externalFoods
            ];

            res.json({ foods: allFoods });
          } catch (apiError) {
            console.error('External API error:', apiError.message);
            // Return local results if external API fails
            res.json({
              foods: localFoods.map(food => ({
                id: food.id.toString(),
                name: food.name,
                brand: food.brand,
                servingSize: food.serving_size,
                calories: food.calories,
                protein: food.protein,
                carbs: food.carbs,
                fat: food.fat,
                fiber: food.fiber,
                sugar: food.sugar,
                sodium: food.sodium,
                source: food.source
              }))
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get food by ID
  getById: (req, res) => {
    const db = getDb();
    const { id } = req.params;

    // Check if ID starts with 'ext_' (external API food)
    if (id.startsWith('ext_')) {
      // For external foods, we would need to fetch from API again
      // For now, return an error or implement caching
      return res.status(404).json({ error: 'External food details not cached' });
    }

    db.get('SELECT * FROM foods WHERE id = ?', [id], (err, food) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!food) {
        return res.status(404).json({ error: 'Food not found' });
      }

      res.json({
        id: food.id.toString(),
        name: food.name,
        brand: food.brand,
        servingSize: food.serving_size,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
        sugar: food.sugar,
        sodium: food.sodium,
        source: food.source
      });
    });
  },

  // Add a new food to the database (for caching external foods or custom entries)
  create: (req, res) => {
    const db = getDb();
    const { name, brand, servingSize, calories, protein, carbs, fat, fiber, sugar, sodium } = req.body;

    if (!name || calories === undefined) {
      return res.status(400).json({ error: 'Name and calories are required' });
    }

    db.run(
      `INSERT INTO foods (name, brand, serving_size, calories, protein, carbs, fat, fiber, sugar, sodium, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user_created')`,
      [name, brand || null, servingSize || '100g', calories, protein || 0, carbs || 0, fat || 0, fiber || 0, sugar || 0, sodium || 0],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Error creating food' });
        }

        res.status(201).json({
          id: this.lastID.toString(),
          name,
          brand,
          servingSize,
          calories,
          protein,
          carbs,
          fat,
          fiber,
          sugar,
          sodium,
          source: 'user_created'
        });
      }
    );
  }
};

module.exports = foodController;
