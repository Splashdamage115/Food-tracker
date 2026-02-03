import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/food_log.dart';
import '../models/food_item.dart';

class FoodLogService {
  static const String _logsKey = 'food_logs';

  Future<List<FoodLog>> getLogsForDate(DateTime date) async {
    final prefs = await SharedPreferences.getInstance();
    final logsJson = prefs.getString(_logsKey);

    if (logsJson == null) {
      return [];
    }

    final List<dynamic> logsList = jsonDecode(logsJson);
    final allLogs = logsList.map((json) => FoodLog.fromJson(json)).toList();

    // Filter logs for the specific date
    return allLogs.where((log) {
      return log.date.year == date.year &&
             log.date.month == date.month &&
             log.date.day == date.day;
    }).toList();
  }

  Future<void> addLog(FoodLog log) async {
    final prefs = await SharedPreferences.getInstance();
    final logsJson = prefs.getString(_logsKey);

    List<FoodLog> logs = [];
    if (logsJson != null) {
      final List<dynamic> logsList = jsonDecode(logsJson);
      logs = logsList.map((json) => FoodLog.fromJson(json)).toList();
    }

    logs.add(log);

    final updatedLogsJson = jsonEncode(logs.map((l) => l.toJson()).toList());
    await prefs.setString(_logsKey, updatedLogsJson);
  }

  Future<void> deleteLog(String logId) async {
    final prefs = await SharedPreferences.getInstance();
    final logsJson = prefs.getString(_logsKey);

    if (logsJson == null) return;

    final List<dynamic> logsList = jsonDecode(logsJson);
    final logs = logsList.map((json) => FoodLog.fromJson(json)).toList();

    logs.removeWhere((log) => log.id == logId);

    final updatedLogsJson = jsonEncode(logs.map((l) => l.toJson()).toList());
    await prefs.setString(_logsKey, updatedLogsJson);
  }

  Future<Map<String, double>> getDailySummary(DateTime date) async {
    final logs = await getLogsForDate(date);

    double totalCalories = 0;
    double totalProtein = 0;
    double totalCarbs = 0;
    double totalFat = 0;

    for (var log in logs) {
      totalCalories += log.totalCalories;
      totalProtein += log.totalProtein;
      totalCarbs += log.totalCarbs;
      totalFat += log.totalFat;
    }

    return {
      'calories': totalCalories,
      'protein': totalProtein,
      'carbs': totalCarbs,
      'fat': totalFat,
    };
  }
}
