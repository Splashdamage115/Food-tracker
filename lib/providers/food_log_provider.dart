import 'package:flutter/foundation.dart';
import '../models/food_log.dart';
import '../services/food_log_service.dart';

class FoodLogProvider with ChangeNotifier {
  final FoodLogService _logService = FoodLogService();
  List<FoodLog> _logs = [];
  DateTime _selectedDate = DateTime.now();
  bool _isLoading = false;
  Map<String, double> _dailySummary = {};

  List<FoodLog> get logs => _logs;
  DateTime get selectedDate => _selectedDate;
  bool get isLoading => _isLoading;
  Map<String, double> get dailySummary => _dailySummary;

  Future<void> loadLogsForDate(DateTime date) async {
    _isLoading = true;
    _selectedDate = date;
    notifyListeners();

    _logs = await _logService.getLogsForDate(date);
    _dailySummary = await _logService.getDailySummary(date);

    _isLoading = false;
    notifyListeners();
  }

  Future<void> addLog(FoodLog log) async {
    await _logService.addLog(log);
    await loadLogsForDate(_selectedDate);
  }

  Future<void> deleteLog(String logId) async {
    await _logService.deleteLog(logId);
    await loadLogsForDate(_selectedDate);
  }

  void changeDate(DateTime date) {
    loadLogsForDate(date);
  }
}
