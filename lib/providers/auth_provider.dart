import 'package:flutter/foundation.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();
  User? _user;
  bool _isLoading = false;

  User? get user => _user;
  bool get isLoggedIn => _user != null;
  bool get isLoading => _isLoading;

  Future<void> checkAuthStatus() async {
    _isLoading = true;
    notifyListeners();

    _user = await _authService.getCurrentUser();

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    final success = await _authService.login(email, password);

    if (success) {
      _user = await _authService.getCurrentUser();
    }

    _isLoading = false;
    notifyListeners();

    return success;
  }

  Future<bool> register(String email, String password, String name) async {
    _isLoading = true;
    notifyListeners();

    final success = await _authService.register(email, password, name);

    if (success) {
      _user = await _authService.getCurrentUser();
    }

    _isLoading = false;
    notifyListeners();

    return success;
  }

  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    await _authService.logout();
    _user = null;

    _isLoading = false;
    notifyListeners();
  }
}
