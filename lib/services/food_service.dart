import '../models/food_item.dart';

class FoodService {
  // Mock food database - In production, this would call the backend API
  static final List<FoodItem> _mockFoods = [
    FoodItem(
      id: '1',
      name: 'Apple',
      brand: 'Fresh',
      servingSize: '100g',
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      sugar: 10.4,
    ),
    FoodItem(
      id: '2',
      name: 'Banana',
      brand: 'Fresh',
      servingSize: '100g',
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      fiber: 2.6,
      sugar: 12.2,
    ),
    FoodItem(
      id: '3',
      name: 'Chicken Breast',
      brand: 'Generic',
      servingSize: '100g',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
    ),
    FoodItem(
      id: '4',
      name: 'Brown Rice',
      brand: 'Generic',
      servingSize: '100g',
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      sugar: 0.4,
    ),
    FoodItem(
      id: '5',
      name: 'Broccoli',
      brand: 'Fresh',
      servingSize: '100g',
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      sugar: 1.7,
    ),
    FoodItem(
      id: '6',
      name: 'Eggs',
      brand: 'Generic',
      servingSize: '1 large (50g)',
      calories: 72,
      protein: 6.3,
      carbs: 0.4,
      fat: 4.8,
      fiber: 0,
      sugar: 0.2,
    ),
    FoodItem(
      id: '7',
      name: 'Salmon',
      brand: 'Atlantic',
      servingSize: '100g',
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13,
      fiber: 0,
      sugar: 0,
    ),
    FoodItem(
      id: '8',
      name: 'Greek Yogurt',
      brand: 'Plain',
      servingSize: '100g',
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      sugar: 3.2,
    ),
    FoodItem(
      id: '9',
      name: 'Oatmeal',
      brand: 'Rolled Oats',
      servingSize: '100g',
      calories: 389,
      protein: 16.9,
      carbs: 66,
      fat: 6.9,
      fiber: 10.6,
      sugar: 0,
    ),
    FoodItem(
      id: '10',
      name: 'Almonds',
      brand: 'Raw',
      servingSize: '100g',
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12.5,
      sugar: 4.4,
    ),
  ];

  Future<List<FoodItem>> searchFoods(String query) async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 500));

    if (query.isEmpty) {
      return _mockFoods;
    }

    return _mockFoods
        .where((food) => 
            food.name.toLowerCase().contains(query.toLowerCase()) ||
            (food.brand?.toLowerCase().contains(query.toLowerCase()) ?? false))
        .toList();
  }

  Future<FoodItem?> getFoodById(String id) async {
    await Future.delayed(const Duration(milliseconds: 300));

    try {
      return _mockFoods.firstWhere((food) => food.id == id);
    } catch (e) {
      return null;
    }
  }
}
