const axios = require('axios');

class NutritionService {
  constructor() {
    this.usdaApiKey = process.env.USDA_API_KEY || 'DEMO_KEY';
    this.usdaBaseUrl = 'https://api.nal.usda.gov/fdc/v1';
  }

  /**
   * Search for foods using USDA FoodData Central API
   * @param {string} query - Search query
   * @param {number} limit - Maximum number of results
   * @returns {Promise<Array>} Array of food items
   */
  async searchFoods(query, limit = 10) {
    try {
      const response = await axios.get(`${this.usdaBaseUrl}/foods/search`, {
        params: {
          api_key: this.usdaApiKey,
          query: query,
          pageSize: Math.min(limit, 25),
          dataType: ['Survey (FNDDS)', 'Foundation', 'SR Legacy']
        },
        timeout: 5000
      });

      if (!response.data || !response.data.foods) {
        return [];
      }

      return response.data.foods.slice(0, limit).map(food => this.formatUSDAFood(food));
    } catch (error) {
      console.error('USDA API error:', error.message);
      // Fall back to Open Food Facts if USDA fails
      return this.searchOpenFoodFacts(query, limit);
    }
  }

  /**
   * Format USDA food data to our standard format
   */
  formatUSDAFood(food) {
    const nutrients = {};
    
    if (food.foodNutrients) {
      food.foodNutrients.forEach(nutrient => {
        const name = nutrient.nutrientName?.toLowerCase() || '';
        if (name.includes('energy')) {
          nutrients.calories = nutrient.value || 0;
        } else if (name.includes('protein')) {
          nutrients.protein = nutrient.value || 0;
        } else if (name.includes('carbohydrate')) {
          nutrients.carbs = nutrient.value || 0;
        } else if (name.includes('total lipid') || name.includes('fat, total')) {
          nutrients.fat = nutrient.value || 0;
        } else if (name.includes('fiber')) {
          nutrients.fiber = nutrient.value || 0;
        } else if (name.includes('sugars, total')) {
          nutrients.sugar = nutrient.value || 0;
        } else if (name.includes('sodium')) {
          nutrients.sodium = nutrient.value || 0;
        }
      });
    }

    return {
      id: `ext_usda_${food.fdcId}`,
      name: food.description || food.lowercaseDescription || 'Unknown',
      brand: food.brandOwner || food.brandName || 'Generic',
      servingSize: '100g',
      calories: nutrients.calories || 0,
      protein: nutrients.protein || 0,
      carbs: nutrients.carbs || 0,
      fat: nutrients.fat || 0,
      fiber: nutrients.fiber || 0,
      sugar: nutrients.sugar || 0,
      sodium: nutrients.sodium || 0,
      source: 'usda'
    };
  }

  /**
   * Fallback to Open Food Facts API
   */
  async searchOpenFoodFacts(query, limit = 10) {
    try {
      const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
        params: {
          search_terms: query,
          page_size: Math.min(limit, 24),
          json: 1,
          fields: 'product_name,brands,nutriments,serving_size'
        },
        timeout: 5000
      });

      if (!response.data || !response.data.products) {
        return [];
      }

      return response.data.products.slice(0, limit).map(product => ({
        id: `ext_off_${product.code || Math.random().toString(36).substr(2, 9)}`,
        name: product.product_name || 'Unknown',
        brand: product.brands || 'Generic',
        servingSize: product.serving_size || '100g',
        calories: product.nutriments?.['energy-kcal_100g'] || 0,
        protein: product.nutriments?.['proteins_100g'] || 0,
        carbs: product.nutriments?.['carbohydrates_100g'] || 0,
        fat: product.nutriments?.['fat_100g'] || 0,
        fiber: product.nutriments?.['fiber_100g'] || 0,
        sugar: product.nutriments?.['sugars_100g'] || 0,
        sodium: product.nutriments?.['sodium_100g'] || 0,
        source: 'openfoodfacts'
      }));
    } catch (error) {
      console.error('Open Food Facts API error:', error.message);
      return [];
    }
  }

  /**
   * Get detailed nutrition information for a specific food
   */
  async getFoodDetails(fdcId) {
    try {
      const response = await axios.get(`${this.usdaBaseUrl}/food/${fdcId}`, {
        params: {
          api_key: this.usdaApiKey
        },
        timeout: 5000
      });

      return this.formatUSDAFood(response.data);
    } catch (error) {
      console.error('Error fetching food details:', error.message);
      throw error;
    }
  }
}

module.exports = new NutritionService();
