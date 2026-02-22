# Food Tracker Backend API

A RESTful API backend for the Food Tracker application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Food Database**: Search and manage food items with nutritional information
- **Food Logging**: Track daily food intake with meal categorization
- **User Goals**: Set and track daily nutritional goals
- **Analytics**: Weekly and monthly summaries of food intake
- **Security**: Rate limiting, helmet security headers, CORS

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/food-tracker
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=24h
```

5. Seed the database with sample foods:
```bash
npm run seed
```

6. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Validate Token
```http
GET /api/auth/validate
Authorization: Bearer <token>
```

### Foods

#### Search Foods
```http
GET /api/foods/search?query=chicken&limit=20
Authorization: Bearer <token>
```

#### Get Food by ID
```http
GET /api/foods/:id
Authorization: Bearer <token>
```

#### Create Food (Admin)
```http
POST /api/foods
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Chicken Breast",
  "brand": "Generic",
  "servingSize": "100g",
  "calories": 165,
  "protein": 31,
  "carbs": 0,
  "fat": 3.6
}
```

### Food Logs

#### Create Food Log
```http
POST /api/food-logs
Authorization: Bearer <token>
Content-Type: application/json

{
  "foodId": "food_id_here",
  "servings": 1.5,
  "mealType": "breakfast",
  "date": "2026-02-22",
  "notes": "Optional notes"
}
```

#### Get Daily Food Logs
```http
GET /api/food-logs?date=2026-02-22
Authorization: Bearer <token>
```

#### Update Food Log
```http
PUT /api/food-logs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "servings": 2.0
}
```

#### Delete Food Log
```http
DELETE /api/food-logs/:id
Authorization: Bearer <token>
```

### User Profile

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Goals
```http
PUT /api/users/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "dailyCaloriesGoal": 2000,
  "dailyProteinGoal": 100,
  "dailyCarbsGoal": 250,
  "dailyFatGoal": 70
}
```

### Analytics

#### Get Weekly Summary
```http
GET /api/analytics/weekly?startDate=2026-02-15
Authorization: Bearer <token>
```

#### Get Monthly Summary
```http
GET /api/analytics/monthly?month=2026-02
Authorization: Bearer <token>
```

### Health Check
```http
GET /api/health
```

## Database Models

### User
- email (unique, required)
- password (hashed, required)
- name (required)
- timestamps

### Food
- name (required)
- brand
- servingSize (required)
- calories (required)
- protein (required)
- carbs (required)
- fat (required)
- fiber
- sugar
- sodium
- source (internal/usda/nutritionix/openfoodfacts)
- externalId
- timestamps

### FoodLog
- user (ref to User, required)
- food (ref to Food, required)
- servings (required)
- mealType (breakfast/lunch/dinner/snack, required)
- date (required)
- notes
- timestamps

### UserGoals
- user (ref to User, unique, required)
- dailyCaloriesGoal (default: 2000)
- dailyProteinGoal (default: 100)
- dailyCarbsGoal (default: 250)
- dailyFatGoal (default: 70)
- timestamps

## Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── foodController.js
│   ├── foodLogController.js
│   ├── userController.js
│   └── analyticsController.js
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── models/
│   ├── User.js
│   ├── Food.js
│   ├── FoodLog.js
│   └── UserGoals.js
├── routes/
│   ├── auth.js
│   ├── foods.js
│   ├── foodLogs.js
│   ├── users.js
│   └── analytics.js
├── utils/
│   └── jwt.js            # JWT token generation
├── .env.example
├── .gitignore
├── package.json
├── seed.js               # Database seeding script
└── server.js             # Entry point
```

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configured
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Centralized error handling

## Development

### Running Tests
```bash
npm test
```

### Seeding Database
```bash
node seed.js
```

### Environment Variables
See `.env.example` for all available configuration options.

## Error Responses

All errors follow this format:
```json
{
  "error": {
    "message": "Error message here"
  }
}
```

Common status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## External API Integration (Future)

The backend is designed to integrate with external nutrition APIs:
- USDA FoodData Central API
- Nutritionix API
- Open Food Facts API

Add API keys to `.env` and implement integration in `controllers/foodController.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.
