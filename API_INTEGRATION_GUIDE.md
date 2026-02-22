# Quick Reference: Connecting Frontend to Backend

## Overview

This guide provides quick reference for connecting the Flutter frontend to the backend API once it's implemented.

## Current Mock Services Location

All mock services are in `lib/services/`:
- `auth_service.dart` - Authentication
- `food_service.dart` - Food database
- `food_log_service.dart` - Food logging

## Steps to Connect to Real Backend

### 1. Add HTTP Package

Update `pubspec.yaml`:
```yaml
dependencies:
  http: ^1.1.0
  # or
  dio: ^5.3.0  # Alternative with more features
```

### 2. Create API Configuration

Create `lib/config/api_config.dart`:
```dart
class ApiConfig {
  static const String baseUrl = 'https://your-api-domain.com/api';
  
  // Endpoints
  static const String login = '$baseUrl/auth/login';
  static const String register = '$baseUrl/auth/register';
  static const String validate = '$baseUrl/auth/validate';
  
  static const String searchFoods = '$baseUrl/foods/search';
  static const String getFoodById = '$baseUrl/foods';
  
  static const String foodLogs = '$baseUrl/food-logs';
  
  // Headers
  static Map<String, String> headers(String? token) => {
    'Content-Type': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
  };
}
```

### 3. Update Auth Service

Replace mock implementation in `lib/services/auth_service.dart`:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';

// Replace login method:
Future<bool> login(String email, String password) async {
  try {
    final response = await http.post(
      Uri.parse(ApiConfig.login),
      headers: ApiConfig.headers(null),
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final prefs = await SharedPreferences.getInstance();
      
      await prefs.setString(_tokenKey, data['token']);
      await prefs.setString(_userIdKey, data['user']['id']);
      await prefs.setString(_userEmailKey, data['user']['email']);
      await prefs.setString(_userNameKey, data['user']['name']);
      
      return true;
    }
    
    return false;
  } catch (e) {
    print('Login error: $e');
    return false;
  }
}

// Similar updates for register method
```

### 4. Update Food Service

Replace mock implementation in `lib/services/food_service.dart`:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../services/auth_service.dart';

class FoodService {
  final AuthService _authService = AuthService();

  Future<List<FoodItem>> searchFoods(String query) async {
    try {
      final token = await _authService.getToken();
      final response = await http.get(
        Uri.parse('${ApiConfig.searchFoods}?query=$query&limit=20'),
        headers: ApiConfig.headers(token),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final List<dynamic> foodsJson = data['foods'];
        return foodsJson.map((json) => FoodItem.fromJson(json)).toList();
      }
      
      return [];
    } catch (e) {
      print('Search error: $e');
      return [];
    }
  }

  Future<FoodItem?> getFoodById(String id) async {
    try {
      final token = await _authService.getToken();
      final response = await http.get(
        Uri.parse('${ApiConfig.getFoodById}/$id'),
        headers: ApiConfig.headers(token),
      );

      if (response.statusCode == 200) {
        return FoodItem.fromJson(jsonDecode(response.body));
      }
      
      return null;
    } catch (e) {
      print('Get food error: $e');
      return null;
    }
  }
}
```

### 5. Update Food Log Service

Replace local storage with API calls in `lib/services/food_log_service.dart`:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import '../config/api_config.dart';
import '../services/auth_service.dart';

class FoodLogService {
  final AuthService _authService = AuthService();

  Future<List<FoodLog>> getLogsForDate(DateTime date) async {
    try {
      final token = await _authService.getToken();
      final dateStr = DateFormat('yyyy-MM-dd').format(date);
      
      final response = await http.get(
        Uri.parse('${ApiConfig.foodLogs}?date=$dateStr'),
        headers: ApiConfig.headers(token),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final List<dynamic> logsJson = data['entries'];
        return logsJson.map((json) => FoodLog.fromJson(json)).toList();
      }
      
      return [];
    } catch (e) {
      print('Get logs error: $e');
      return [];
    }
  }

  Future<void> addLog(FoodLog log) async {
    try {
      final token = await _authService.getToken();
      
      await http.post(
        Uri.parse(ApiConfig.foodLogs),
        headers: ApiConfig.headers(token),
        body: jsonEncode({
          'foodId': log.food.id,
          'servings': log.servings,
          'mealType': log.mealType,
          'date': DateFormat('yyyy-MM-dd').format(log.date),
          'notes': log.notes,
        }),
      );
    } catch (e) {
      print('Add log error: $e');
    }
  }

  Future<void> deleteLog(String logId) async {
    try {
      final token = await _authService.getToken();
      
      await http.delete(
        Uri.parse('${ApiConfig.foodLogs}/$logId'),
        headers: ApiConfig.headers(token),
      );
    } catch (e) {
      print('Delete log error: $e');
    }
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
```

## Error Handling Best Practices

```dart
// Create a custom exception class
class ApiException implements Exception {
  final String message;
  final int? statusCode;
  
  ApiException(this.message, [this.statusCode]);
  
  @override
  String toString() => message;
}

// Use try-catch with specific error handling
try {
  final response = await http.get(url);
  
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  } else if (response.statusCode == 401) {
    throw ApiException('Unauthorized', 401);
  } else if (response.statusCode == 404) {
    throw ApiException('Not found', 404);
  } else {
    throw ApiException('Server error', response.statusCode);
  }
} on ApiException {
  rethrow;
} on SocketException {
  throw ApiException('No internet connection');
} catch (e) {
  throw ApiException('Unexpected error: $e');
}
```

## Testing the Connection

### 1. Test Authentication
```dart
// In a test file or debug screen
final authService = AuthService();
final success = await authService.login('test@example.com', 'password123');
print('Login successful: $success');
```

### 2. Test Food Search
```dart
final foodService = FoodService();
final foods = await foodService.searchFoods('chicken');
print('Found ${foods.length} foods');
```

### 3. Test Food Logging
```dart
final logService = FoodLogService();
final logs = await logService.getLogsForDate(DateTime.now());
print('Today\'s logs: ${logs.length}');
```

## Environment-Specific Configuration

Create `lib/config/environment.dart`:

```dart
enum Environment { development, staging, production }

class EnvironmentConfig {
  static const Environment current = Environment.development;
  
  static String get apiBaseUrl {
    switch (current) {
      case Environment.development:
        return 'http://localhost:3000/api';
      case Environment.staging:
        return 'https://staging-api.foodtracker.com/api';
      case Environment.production:
        return 'https://api.foodtracker.com/api';
    }
  }
}
```

## Debugging Tips

### Enable HTTP Logging
```dart
import 'package:http/http.dart' as http;

// Add logging wrapper
Future<http.Response> loggedGet(Uri url, {Map<String, String>? headers}) async {
  print('GET: $url');
  final response = await http.get(url, headers: headers);
  print('Response: ${response.statusCode} - ${response.body}');
  return response;
}
```

### Use Dio for Advanced Debugging
```dart
import 'package:dio/dio.dart';

final dio = Dio(BaseOptions(
  baseUrl: ApiConfig.baseUrl,
  connectTimeout: Duration(seconds: 5),
  receiveTimeout: Duration(seconds: 3),
));

// Add interceptor for logging
dio.interceptors.add(LogInterceptor(
  request: true,
  requestBody: true,
  responseBody: true,
  error: true,
));
```

## Common Issues and Solutions

### Issue 1: CORS Errors (Web)
**Solution**: Backend must set proper CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Issue 2: SSL Certificate Errors (Development)
**Solution**: For development only, bypass certificate verification:
```dart
class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback = (cert, host, port) => true;
  }
}

void main() {
  HttpOverrides.global = MyHttpOverrides();
  runApp(MyApp());
}
```

### Issue 3: Token Expiration
**Solution**: Implement token refresh mechanism:
```dart
Future<void> refreshToken() async {
  // Implement token refresh logic
  // Usually involves calling a refresh endpoint
}

// Check token validity before each request
if (await isTokenExpired()) {
  await refreshToken();
}
```

## Next Steps

1. ✅ Implement backend according to `backend_docs/BACKEND_IMPLEMENTATION.md`
2. ✅ Set up backend API and deploy it
3. ✅ Update `api_config.dart` with your API URL
4. ✅ Replace mock services with real API calls
5. ✅ Test authentication flow
6. ✅ Test food search and display
7. ✅ Test food logging functionality
8. ✅ Implement error handling
9. ✅ Add loading states
10. ✅ Test on multiple devices
11. ✅ Deploy frontend

## Resources

- [HTTP Package Docs](https://pub.dev/packages/http)
- [Dio Package Docs](https://pub.dev/packages/dio)
- [REST API Best Practices](https://restfulapi.net/)
- [Flutter Networking](https://flutter.dev/docs/cookbook/networking/fetch-data)
- [JSON Serialization](https://flutter.dev/docs/development/data-and-backend/json)
