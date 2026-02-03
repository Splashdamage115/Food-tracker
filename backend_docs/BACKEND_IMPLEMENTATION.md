# Food Tracker Backend Implementation Requirements

## Overview
This document outlines the backend requirements for the Food Tracker application. The backend should provide RESTful APIs for user authentication, food data management, and nutritional information tracking.

## Technology Stack Recommendations
- **Framework**: Node.js with Express, Python with FastAPI/Django, or Java with Spring Boot
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **External APIs**: USDA FoodData Central API, Nutritionix API, or Open Food Facts API

## Core Features Required

### 1. Authentication System

#### User Registration
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }
  ```
- **Response**: User object with JWT token

#### User Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

#### Token Validation
- **Endpoint**: `GET /api/auth/validate`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object or 401 Unauthorized

### 2. Food Database Management

#### Search Foods
- **Endpoint**: `GET /api/foods/search?query=apple&limit=20`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "foods": [
      {
        "id": "food_id",
        "name": "Apple, raw",
        "brand": "Generic",
        "servingSize": "100g",
        "calories": 52,
        "protein": 0.3,
        "carbs": 14,
        "fat": 0.2,
        "fiber": 2.4,
        "sugar": 10.4
      }
    ]
  }
  ```

#### Get Food Details
- **Endpoint**: `GET /api/foods/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Detailed food object with full nutritional information

### 3. Daily Food Tracking

#### Log Food Entry
- **Endpoint**: `POST /api/food-logs`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "foodId": "food_id",
    "servings": 1.5,
    "mealType": "breakfast",
    "date": "2026-02-03",
    "notes": "With breakfast"
  }
  ```
- **Response**: Created food log entry

#### Get Daily Log
- **Endpoint**: `GET /api/food-logs?date=2026-02-03`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "date": "2026-02-03",
    "entries": [
      {
        "id": "log_id",
        "food": { /* food object */ },
        "servings": 1.5,
        "mealType": "breakfast",
        "totalCalories": 78,
        "totalProtein": 0.45,
        "timestamp": "2026-02-03T08:30:00Z"
      }
    ],
    "dailySummary": {
      "totalCalories": 1850,
      "totalProtein": 85,
      "totalCarbs": 220,
      "totalFat": 65
    }
  }
  ```

#### Update Food Entry
- **Endpoint**: `PUT /api/food-logs/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Updated entry data
- **Response**: Updated food log entry

#### Delete Food Entry
- **Endpoint**: `DELETE /api/food-logs/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 204 No Content

### 4. User Profile & Goals

#### Get User Profile
- **Endpoint**: `GET /api/users/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User profile with goals

#### Update Nutritional Goals
- **Endpoint**: `PUT /api/users/goals`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "dailyCaloriesGoal": 2000,
    "dailyProteinGoal": 100,
    "dailyCarbsGoal": 250,
    "dailyFatGoal": 70
  }
  ```

### 5. Analytics & History

#### Get Weekly Summary
- **Endpoint**: `GET /api/analytics/weekly?startDate=2026-01-27`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Weekly aggregated data

#### Get Monthly Summary
- **Endpoint**: `GET /api/analytics/monthly?month=2026-02`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Monthly aggregated data

## Database Schema

### Users Table
- `id` (PRIMARY KEY)
- `email` (UNIQUE, NOT NULL)
- `password_hash` (NOT NULL)
- `name`
- `created_at`
- `updated_at`

### Foods Table
- `id` (PRIMARY KEY)
- `name` (NOT NULL)
- `brand`
- `serving_size`
- `calories`
- `protein`
- `carbs`
- `fat`
- `fiber`
- `sugar`
- `sodium`
- `source` (internal/usda/nutritionix)
- `external_id` (for API sources)
- `created_at`
- `updated_at`

### Food_Logs Table
- `id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY -> Users)
- `food_id` (FOREIGN KEY -> Foods)
- `servings` (DECIMAL)
- `meal_type` (breakfast/lunch/dinner/snack)
- `date` (DATE)
- `notes` (TEXT)
- `created_at`
- `updated_at`

### User_Goals Table
- `id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY -> Users, UNIQUE)
- `daily_calories_goal`
- `daily_protein_goal`
- `daily_carbs_goal`
- `daily_fat_goal`
- `created_at`
- `updated_at`

## External API Integration

### USDA FoodData Central API
- **Base URL**: `https://api.nal.usda.gov/fdc/v1/`
- **API Key Required**: Yes (free tier available)
- **Use Case**: Comprehensive nutritional database
- **Documentation**: https://fdc.nal.usda.gov/api-guide.html

### Nutritionix API (Alternative)
- **Base URL**: `https://trackapi.nutritionix.com/v2/`
- **API Key Required**: Yes
- **Use Case**: Food search and nutritional data
- **Documentation**: https://www.nutritionix.com/business/api

### Open Food Facts API (Alternative)
- **Base URL**: `https://world.openfoodfacts.org/`
- **API Key Required**: No
- **Use Case**: Open source food database
- **Documentation**: https://wiki.openfoodfacts.org/API

## Security Considerations

1. **Password Security**: Use bcrypt or similar for password hashing (minimum 10 rounds)
2. **JWT Security**: 
   - Use strong secret keys
   - Set appropriate expiration times (e.g., 24 hours)
   - Implement refresh token mechanism
3. **Rate Limiting**: Implement rate limiting on all endpoints
4. **Input Validation**: Validate all user inputs
5. **SQL Injection Prevention**: Use parameterized queries or ORM
6. **CORS**: Configure appropriate CORS policies
7. **HTTPS**: Enforce HTTPS in production

## Performance Optimization

1. **Database Indexing**: 
   - Index on user_id, date in food_logs
   - Index on name in foods table
2. **Caching**: Cache frequently accessed food data
3. **Pagination**: Implement pagination for search results
4. **Background Jobs**: Use queue system for external API calls

## Testing Requirements

1. **Unit Tests**: All service methods
2. **Integration Tests**: API endpoints
3. **Authentication Tests**: Login, registration, token validation
4. **Database Tests**: CRUD operations

## Deployment Considerations

1. **Environment Variables**: Store sensitive data (API keys, DB credentials)
2. **Database Migrations**: Use migration tool (e.g., Alembic, Flyway)
3. **Logging**: Implement comprehensive logging
4. **Monitoring**: Set up application monitoring
5. **Backup**: Regular database backups

## Future Enhancements

1. **Barcode Scanning**: Integrate barcode lookup API
2. **Recipe Management**: Store and track recipes
3. **Meal Planning**: Suggest meal plans based on goals
4. **Social Features**: Share meals and recipes with friends
5. **Photo Recognition**: AI-powered food recognition from photos
6. **Wearable Integration**: Sync with fitness trackers
7. **Export Data**: Allow users to export their data
