# Food Tracker - Quick Start Guide

This guide will help you get both the backend and frontend running quickly.

## Prerequisites

- **Backend**: Node.js (v14+) and npm
- **Frontend**: Flutter SDK (v3.0+)
- Python 3 (for running tests)

## Quick Start

### 1. Start the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend will be available at `http://localhost:3000`

### 2. Test the Backend

In a new terminal:

```bash
cd backend
./test-api.sh
```

You should see all 12 tests pass.

### 3. Run the Flutter App

In a new terminal:

```bash
# From the root directory
flutter pub get
flutter run
```

## API Documentation

Once the backend is running, visit `http://localhost:3000/` to see the API documentation.

## Testing Individual Endpoints

### Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","name":"John Doe"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

Save the token from the response and use it in subsequent requests:

```bash
TOKEN="your_token_here"
```

### Search Foods

```bash
curl -X GET "http://localhost:3000/api/foods/search?query=chicken&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Log Food

```bash
curl -X POST http://localhost:3000/api/food-logs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"foodId":"3","servings":1,"mealType":"dinner","date":"2026-02-03"}'
```

### Get Daily Summary

```bash
curl -X GET "http://localhost:3000/api/food-logs?date=2026-02-03" \
  -H "Authorization: Bearer $TOKEN"
```

## Database

The backend uses SQLite, which creates a file called `foodtracker.db` in the backend directory. 

To reset the database:

```bash
cd backend
rm foodtracker.db
npm start
```

The database will be recreated with seed data on startup.

## Environment Variables

The backend uses the following environment variables (configured in `backend/.env`):

- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)
- `USDA_API_KEY` - USDA API key (use DEMO_KEY for testing)
- `NODE_ENV` - Environment (development/production)

## Features

✅ **Authentication**: JWT-based user authentication  
✅ **Food Database**: 15 pre-seeded food items  
✅ **External APIs**: Integration with USDA FoodData Central & Open Food Facts  
✅ **Food Logging**: Track meals by date and meal type  
✅ **Nutritional Goals**: Customizable daily goals  
✅ **Daily Summary**: Automatic calculation of daily totals  

## Architecture

```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── db/            # Database seed data
│   ├── middleware/    # Authentication middleware
│   ├── routes/        # API routes
│   ├── services/      # External API integration
│   └── server.js      # Main server file
├── .env               # Environment variables
├── package.json       # Dependencies
└── README.md          # Full documentation
```

## Troubleshooting

**Port already in use**: Change the `PORT` in `.env`

**Database errors**: Delete `foodtracker.db` and restart

**External API not working**: This is expected in restricted environments. The API falls back to the local database.

## Next Steps

1. Connect the Flutter app to the backend
2. Deploy the backend to a cloud service
3. Get a real USDA API key for production
4. Set up CI/CD pipeline
5. Add more comprehensive tests

For detailed information, see:
- Backend: `backend/README.md`
- Frontend: `README.md`
- Backend Requirements: `backend_docs/BACKEND_IMPLEMENTATION.md`
