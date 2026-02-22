import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

class AuthService {
  static const String _tokenKey = 'auth_token';
  static const String _userIdKey = 'user_id';
  static const String _userEmailKey = 'user_email';
  static const String _userNameKey = 'user_name';

  // Mock login - In production, this would call the backend API
  Future<bool> login(String email, String password) async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    // Mock validation - accept any non-empty credentials
    if (email.isNotEmpty && password.isNotEmpty) {
      final prefs = await SharedPreferences.getInstance();
      
      // Store mock token and user info
      await prefs.setString(_tokenKey, 'mock_token_${DateTime.now().millisecondsSinceEpoch}');
      await prefs.setString(_userIdKey, 'user_123');
      await prefs.setString(_userEmailKey, email);
      await prefs.setString(_userNameKey, email.split('@')[0]);
      
      return true;
    }
    
    return false;
  }

  // Mock registration
  Future<bool> register(String email, String password, String name) async {
    await Future.delayed(const Duration(seconds: 1));

    if (email.isNotEmpty && password.isNotEmpty && name.isNotEmpty) {
      final prefs = await SharedPreferences.getInstance();
      
      await prefs.setString(_tokenKey, 'mock_token_${DateTime.now().millisecondsSinceEpoch}');
      await prefs.setString(_userIdKey, 'user_${DateTime.now().millisecondsSinceEpoch}');
      await prefs.setString(_userEmailKey, email);
      await prefs.setString(_userNameKey, name);
      
      return true;
    }
    
    return false;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_userIdKey);
    await prefs.remove(_userEmailKey);
    await prefs.remove(_userNameKey);
  }

  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey(_tokenKey);
  }

  Future<User?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    
    if (!prefs.containsKey(_tokenKey)) {
      return null;
    }

    return User(
      id: prefs.getString(_userIdKey) ?? '',
      email: prefs.getString(_userEmailKey) ?? '',
      name: prefs.getString(_userNameKey) ?? '',
    );
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }
}
