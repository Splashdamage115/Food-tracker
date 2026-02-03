import 'food_item.dart';

class FoodLog {
  final String id;
  final FoodItem food;
  final double servings;
  final String mealType;
  final DateTime date;
  final String? notes;

  FoodLog({
    required this.id,
    required this.food,
    required this.servings,
    required this.mealType,
    required this.date,
    this.notes,
  });

  double get totalCalories => food.calories * servings;
  double get totalProtein => food.protein * servings;
  double get totalCarbs => food.carbs * servings;
  double get totalFat => food.fat * servings;

  factory FoodLog.fromJson(Map<String, dynamic> json) {
    return FoodLog(
      id: json['id'] as String,
      food: FoodItem.fromJson(json['food'] as Map<String, dynamic>),
      servings: (json['servings'] as num).toDouble(),
      mealType: json['mealType'] as String,
      date: DateTime.parse(json['date'] as String),
      notes: json['notes'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'food': food.toJson(),
      'servings': servings,
      'mealType': mealType,
      'date': date.toIso8601String(),
      'notes': notes,
    };
  }
}
