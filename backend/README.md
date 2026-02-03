# Food Tracker Backend API

A comprehensive RESTful API backend for the Food Tracker application. Built with Node.js, Express, and SQLite, with integration to external nutritional APIs.

## Features

- ✅ User authentication with JWT tokens
- ✅ Food search from local database and external APIs (USDA FoodData Central & Open Food Facts)
- ✅ Daily food logging with meal type categorization
- ✅ Nutritional tracking and goal management
- ✅ SQLite database for easy deployment
- ✅ CORS enabled for cross-origin requests
- ✅ Secure password hashing with bcrypt

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **External APIs**: USDA FoodData Central, Open Food Facts

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the values:
```env
PORT=3000
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRES_IN=24h
USDA_API_KEY=your_usda_api_key_or_DEMO_KEY
NODE_ENV=development
```

**Note**: The USDA API key is optional. The API will use "DEMO_KEY" as a fallback, which has rate limits. For production use, get a free API key from https://fdc.nal.usda.gov/api-key-signup.html

## Running the Server

### Development Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Validate Token
```http
GET /api/auth/validate
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Food Endpoints

All food endpoints require authentication.

#### Search Foods
```http
GET /api/foods/search?query=apple&limit=20
Authorization: Bearer <token>
```

**Response:**
```json
{
  "foods": [
    {
      "id": "1",
      "name": "Apple",
      "brand": "Fresh",
      "servingSize": "100g",
      "calories": 52,
      "protein": 0.3,
      "carbs": 14,
      "fat": 0.2,
      "fiber": 2.4,
      "sugar": 10.4,
      "sodium": 1,
      "source": "internal"
    }
  ]
}
```

#### Get Food by ID
```http
GET /api/foods/:id
Authorization: Bearer <token>
```

#### Create Custom Food
```http
POST /api/foods
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Custom Meal",
  "brand": "Homemade",
  "servingSize": "1 serving",
  "calories": 350,
  "protein": 25,
  "carbs": 40,
  "fat": 10,
  "fiber": 5,
  "sugar": 8,
  "sodium": 200
}
```

### Food Log Endpoints

#### Create Food Log Entry
```http
POST /api/food-logs
Authorization: Bearer <token>
Content-Type: application/json

{
  "foodId": "1",
  "servings": 1.5,
  "mealType": "breakfast",
  "date": "2026-02-03",
  "notes": "With breakfast"
}
```

**Response:**
```json
{
  "id": "1",
  "food": {
    "id": "1",
    "name": "Apple",
    "brand": "Fresh",
    "servingSize": "100g",
    "calories": 52,
    "protein": 0.3,
    "carbs": 14,
    "fat": 0.2
  },
  "servings": 1.5,
  "mealType": "breakfast",
  "date": "2026-02-03",
  "notes": "With breakfast",
  "totalCalories": 78,
  "totalProtein": 0.45,
  "totalCarbs": 21,
  "totalFat": 0.3
}
```

#### Get Daily Food Logs
```http
GET /api/food-logs?date=2026-02-03
Authorization: Bearer <token>
```

**Response:**
```json
{
  "date": "2026-02-03",
  "entries": [...],
  "dailySummary": {
    "totalCalories": 1850,
    "totalProtein": 85,
    "totalCarbs": 220,
    "totalFat": 65
  }
}
```

#### Update Food Log Entry
```http
PUT /api/food-logs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "servings": 2,
  "mealType": "lunch",
  "notes": "Updated notes"
}
```

#### Delete Food Log Entry
```http
DELETE /api/food-logs/:id
Authorization: Bearer <token>
```

**Response:** 204 No Content

### User Profile Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2026-02-03T17:30:00.000Z",
  "goals": {
    "dailyCaloriesGoal": 2000,
    "dailyProteinGoal": 100,
    "dailyCarbsGoal": 250,
    "dailyFatGoal": 70
  }
}
```

#### Update Nutritional Goals
```http
PUT /api/users/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "dailyCaloriesGoal": 2200,
  "dailyProteinGoal": 120,
  "dailyCarbsGoal": 275,
  "dailyFatGoal": 75
}
```

## External API Integration

The backend integrates with two external nutritional APIs:

### USDA FoodData Central API
- **Primary data source** for comprehensive nutritional information
- **Documentation**: https://fdc.nal.usda.gov/api-guide.html
- **API Key**: Free tier available (required for production)
- **Rate Limits**: 1,000 requests/hour with API key, 30 requests/hour with DEMO_KEY

### Open Food Facts API
- **Fallback data source** when USDA API is unavailable
- **Documentation**: https://wiki.openfoodfacts.org/API
- **API Key**: Not required
- **Rate Limits**: No strict limits, but please be considerate

## Database Schema

The application uses SQLite with the following tables:

### users
- `id` (INTEGER, PRIMARY KEY)
- `email` (TEXT, UNIQUE)
- `password_hash` (TEXT)
- `name` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### foods
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `brand` (TEXT)
- `serving_size` (TEXT)
- `calories` (REAL)
- `protein` (REAL)
- `carbs` (REAL)
- `fat` (REAL)
- `fiber` (REAL)
- `sugar` (REAL)
- `sodium` (REAL)
- `source` (TEXT)
- `external_id` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### food_logs
- `id` (INTEGER, PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY)
- `food_id` (INTEGER, FOREIGN KEY)
- `servings` (REAL)
- `meal_type` (TEXT)
- `date` (DATE)
- `notes` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### user_goals
- `id` (INTEGER, PRIMARY KEY)
- `user_id` (INTEGER, UNIQUE, FOREIGN KEY)
- `daily_calories_goal` (REAL)
- `daily_protein_goal` (REAL)
- `daily_carbs_goal` (REAL)
- `daily_fat_goal` (REAL)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## Testing the API

You can test the API using:

### cURL
```bash
# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Search foods (replace <token> with actual token)
curl -X GET "http://localhost:3000/api/foods/search?query=apple" \
  -H "Authorization: Bearer <token>"
```

### Postman
1. Import the API endpoints
2. Set up an environment variable for the token
3. Test each endpoint

### Thunder Client (VS Code Extension)
1. Install Thunder Client extension
2. Create a new collection
3. Add requests for each endpoint

## Security Considerations

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Authentication**: Tokens expire after 24 hours (configurable)
3. **Environment Variables**: Sensitive data stored in `.env` file (not committed to git)
4. **Input Validation**: All endpoints validate input data
5. **CORS**: Configured to allow cross-origin requests
6. **SQL Injection Prevention**: Using parameterized queries with SQLite

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use a strong, random `JWT_SECRET`
3. Get a real USDA API key
4. Consider using PostgreSQL instead of SQLite for better performance
5. Set up HTTPS/SSL
6. Implement rate limiting
7. Add request logging and monitoring
8. Set up regular database backups

## Troubleshooting

### Database Issues
If you encounter database errors, delete the `foodtracker.db` file and restart the server. It will recreate the database with seed data.

### Port Already in Use
If port 3000 is already in use, change the `PORT` in `.env` file.

### External API Errors
If external APIs are not working:
- Check your internet connection
- Verify API keys in `.env`
- Check API rate limits
- The app will fall back to local database if external APIs fail

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
