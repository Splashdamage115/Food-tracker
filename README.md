# Food Tracker App

A Flutter application for tracking daily food intake and monitoring nutritional information.

## Features

- **User Authentication**: Login and logout functionality with secure session management
- **Food Search**: Search from a comprehensive database of foods with nutritional information
- **Daily Tracking**: Log food intake throughout the day with meal type categorization (breakfast, lunch, dinner, snacks)
- **Nutritional Insights**: View detailed nutritional information including calories, protein, carbs, and fat
- **Daily Summary**: Track progress towards daily nutritional goals
- **Date Navigation**: View and log food for any date
- **Persistent Storage**: All data is stored locally using SharedPreferences

## Screenshots

[Screenshots will be added after running the app]

## Getting Started

### Prerequisites

- Flutter SDK (>=3.0.0)
- Dart SDK
- An IDE (VS Code, Android Studio, or IntelliJ)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Splashdamage115/Food-tracker.git
cd Food-tracker
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
flutter run
```

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   ├── user.dart
│   ├── food_item.dart
│   └── food_log.dart
├── providers/                # State management
│   ├── auth_provider.dart
│   └── food_log_provider.dart
├── screens/                  # UI screens
│   ├── login_screen.dart
│   ├── home_screen.dart
│   └── add_food_screen.dart
├── services/                 # Business logic & API calls
│   ├── auth_service.dart
│   ├── food_service.dart
│   └── food_log_service.dart
└── widgets/                  # Reusable widgets
    ├── food_log_card.dart
    └── daily_summary_card.dart
```

## Backend Integration

This repository now includes a fully functional backend API. The backend is located in the `backend` directory.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the backend server:
```bash
npm start
```

The backend server will start on `http://localhost:3000`.

For detailed backend documentation, see [`backend/README.md`](backend/README.md).

### Available Backend API Endpoints

All endpoints are documented at `http://localhost:3000/` when the server is running.

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/validate` - Validate JWT token

**Foods:**
- `GET /api/foods/search?query=apple&limit=20` - Search foods (local + external APIs)
- `GET /api/foods/:id` - Get food details
- `POST /api/foods` - Create custom food entry

**Food Logs:**
- `POST /api/food-logs` - Log food entry
- `GET /api/food-logs?date=YYYY-MM-DD` - Get daily logs
- `PUT /api/food-logs/:id` - Update food entry
- `DELETE /api/food-logs/:id` - Delete food entry

**User Profile:**
- `GET /api/users/profile` - Get user profile with goals
- `PUT /api/users/goals` - Update nutritional goals

### External API Integration

The backend integrates with two public nutritional APIs:
- **USDA FoodData Central API** - Primary data source
- **Open Food Facts API** - Fallback data source

The backend gracefully falls back to the local database if external APIs are unavailable.

### Mock Data (Frontend Only)

The Flutter frontend currently uses mock data for demonstration purposes:
- Authentication accepts any non-empty credentials
- Food database contains sample food items
- Data is stored locally using SharedPreferences

To connect the frontend to the backend, update the API endpoints in the Flutter service files.

## Technologies Used

- **Flutter**: Cross-platform UI framework
- **Provider**: State management
- **SharedPreferences**: Local data persistence
- **Intl**: Date formatting and internationalization

## Future Enhancements

- Barcode scanning for quick food lookup
- Recipe management and tracking
- Meal planning and suggestions
- Social features (share meals with friends)
- Integration with fitness trackers
- Photo-based food recognition
- Export data functionality
- Custom nutritional goals per user
- Weekly and monthly analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository.