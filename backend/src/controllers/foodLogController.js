const { getDb } = require('../config/database');

const foodLogController = {
  // Create a new food log entry
  create: (req, res) => {
    const db = getDb();
    const { foodId, servings, mealType, date, notes } = req.body;
    const userId = req.userId;

    if (!foodId || !servings || !mealType || !date) {
      return res.status(400).json({ error: 'foodId, servings, mealType, and date are required' });
    }

    // Validate meal type
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!validMealTypes.includes(mealType.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid meal type' });
    }

    // First, get the food details
    db.get('SELECT * FROM foods WHERE id = ?', [foodId], (err, food) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!food) {
        return res.status(404).json({ error: 'Food not found' });
      }

      // Insert food log
      db.run(
        'INSERT INTO food_logs (user_id, food_id, servings, meal_type, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, foodId, servings, mealType.toLowerCase(), date, notes || null],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Error creating food log' });
          }

          const logId = this.lastID;

          // Calculate totals
          const totalCalories = food.calories * servings;
          const totalProtein = food.protein * servings;
          const totalCarbs = food.carbs * servings;
          const totalFat = food.fat * servings;

          res.status(201).json({
            id: logId.toString(),
            food: {
              id: food.id.toString(),
              name: food.name,
              brand: food.brand,
              servingSize: food.serving_size,
              calories: food.calories,
              protein: food.protein,
              carbs: food.carbs,
              fat: food.fat
            },
            servings,
            mealType: mealType.toLowerCase(),
            date,
            notes,
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFat
          });
        }
      );
    });
  },

  // Get food logs for a specific date
  getByDate: (req, res) => {
    const db = getDb();
    const { date } = req.query;
    const userId = req.userId;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const query = `
      SELECT fl.*, f.*,
             fl.id as log_id,
             f.id as food_id
      FROM food_logs fl
      JOIN foods f ON fl.food_id = f.id
      WHERE fl.user_id = ? AND fl.date = ?
      ORDER BY fl.created_at ASC
    `;

    db.all(query, [userId, date], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const entries = rows.map(row => ({
        id: row.log_id.toString(),
        food: {
          id: row.food_id.toString(),
          name: row.name,
          brand: row.brand,
          servingSize: row.serving_size,
          calories: row.calories,
          protein: row.protein,
          carbs: row.carbs,
          fat: row.fat
        },
        servings: row.servings,
        mealType: row.meal_type,
        totalCalories: row.calories * row.servings,
        totalProtein: row.protein * row.servings,
        totalCarbs: row.carbs * row.servings,
        totalFat: row.fat * row.servings,
        timestamp: row.created_at,
        notes: row.notes
      }));

      // Calculate daily summary
      const dailySummary = entries.reduce(
        (acc, entry) => ({
          totalCalories: acc.totalCalories + entry.totalCalories,
          totalProtein: acc.totalProtein + entry.totalProtein,
          totalCarbs: acc.totalCarbs + entry.totalCarbs,
          totalFat: acc.totalFat + entry.totalFat
        }),
        { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
      );

      res.json({
        date,
        entries,
        dailySummary
      });
    });
  },

  // Update a food log entry
  update: (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const { servings, mealType, notes } = req.body;
    const userId = req.userId;

    // First check if log exists and belongs to user
    db.get('SELECT * FROM food_logs WHERE id = ? AND user_id = ?', [id, userId], (err, log) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!log) {
        return res.status(404).json({ error: 'Food log not found' });
      }

      // Build update query dynamically
      const updates = [];
      const params = [];

      if (servings !== undefined) {
        updates.push('servings = ?');
        params.push(servings);
      }
      if (mealType !== undefined) {
        updates.push('meal_type = ?');
        params.push(mealType.toLowerCase());
      }
      if (notes !== undefined) {
        updates.push('notes = ?');
        params.push(notes);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      params.push(id, userId);

      db.run(
        `UPDATE food_logs SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
        params,
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Error updating food log' });
          }

          // Get updated log with food details
          const query = `
            SELECT fl.*, f.*,
                   fl.id as log_id,
                   f.id as food_id
            FROM food_logs fl
            JOIN foods f ON fl.food_id = f.id
            WHERE fl.id = ?
          `;

          db.get(query, [id], (err, row) => {
            if (err) {
              return res.status(500).json({ error: 'Database error' });
            }

            res.json({
              id: row.log_id.toString(),
              food: {
                id: row.food_id.toString(),
                name: row.name,
                brand: row.brand,
                servingSize: row.serving_size,
                calories: row.calories,
                protein: row.protein,
                carbs: row.carbs,
                fat: row.fat
              },
              servings: row.servings,
              mealType: row.meal_type,
              totalCalories: row.calories * row.servings,
              totalProtein: row.protein * row.servings,
              totalCarbs: row.carbs * row.servings,
              totalFat: row.fat * row.servings,
              notes: row.notes
            });
          });
        }
      );
    });
  },

  // Delete a food log entry
  delete: (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const userId = req.userId;

    db.run('DELETE FROM food_logs WHERE id = ? AND user_id = ?', [id, userId], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Food log not found' });
      }

      res.status(204).send();
    });
  }
};

module.exports = foodLogController;
