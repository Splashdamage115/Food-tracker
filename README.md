# Food Tracker App

A complete full-stack application for tracking daily food intake and monitoring nutritional information. Built with Flutter for the frontend and Node.js/Express for the backend.

## Features

- **User Authentication**: Login and logout functionality with JWT-based secure session management
- **Food Search**: Search from a comprehensive database of foods with nutritional information
- **Daily Tracking**: Log food intake throughout the day with meal type categorization (breakfast, lunch, dinner, snacks)
- **Nutritional Insights**: View detailed nutritional information including calories, protein, carbs, and fat
- **Daily Summary**: Track progress towards daily nutritional goals with visual progress bars
- **Date Navigation**: View and log food for any date
- **Analytics**: Weekly and monthly summaries of food intake
- **User Goals**: Customizable daily nutritional goals

## Screenshots

[Screenshots will be added after running the app]

## Architecture

This is a full-stack application with:
- **Frontend**: Flutter mobile app (iOS/Android/Web)
- **Backend**: Node.js/Express REST API
- **Database**: MongoDB

## Getting Started

### Frontend (Flutter App)

#### Prerequisites
- Flutter SDK (>=3.0.0)
- Dart SDK
- An IDE (VS Code, Android Studio, or IntelliJ)

#### Installation
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

For detailed setup instructions, see [SETUP.md](SETUP.md)

### Backend (Node.js API)

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

#### Installation
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

For detailed backend documentation, see [backend/README.md](backend/README.md)

## Project Structure

```
Food-tracker/
├── lib/                          # Flutter frontend
│   ├── main.dart                 # App entry point
│   ├── models/                   # Data models
│   ├── providers/                # State management
│   ├── screens/                  # UI screens
│   ├── services/                 # Business logic & API calls
│   └── widgets/                  # Reusable widgets
├── backend/                      # Node.js backend
│   ├── config/                   # Configuration
│   ├── controllers/              # Route controllers
│   ├── middleware/               # Auth & validation
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── utils/                    # Helper functions
│   └── server.js                 # Entry point
├── backend_docs/                 # Backend specification
└── docs/                         # Documentation
```

## Backend API

The backend implements all endpoints specified in `backend_docs/BACKEND_IMPLEMENTATION.md`:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/validate` - Token validation

### Foods
- `GET /api/foods/search` - Search food database
- `GET /api/foods/:id` - Get food details
- `POST /api/foods` - Create food item

### Food Logs
- `POST /api/food-logs` - Log food entry
- `GET /api/food-logs` - Get daily logs
- `PUT /api/food-logs/:id` - Update log entry
- `DELETE /api/food-logs/:id` - Delete log entry

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/goals` - Update nutritional goals

### Analytics
- `GET /api/analytics/weekly` - Weekly summary
- `GET /api/analytics/monthly` - Monthly summary

For complete API documentation, see [backend/README.md](backend/README.md)

## Technologies Used

### Frontend
- **Flutter**: Cross-platform UI framework
- **Provider**: State management
- **SharedPreferences**: Local data persistence
- **Intl**: Date formatting and internationalization
- **Material Design 3**: UI design system

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Helmet**: Security headers
- **Rate Limiting**: API protection

## Development Mode

The app can run in two modes:

1. **Standalone Mode** (Current): Uses mock data and local storage
2. **Connected Mode**: Connect to the backend API

To connect the frontend to the backend, see [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)

## Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP.md](SETUP.md)** - Development environment setup
- **[TESTING.md](TESTING.md)** - Testing instructions
- **[UI_DOCUMENTATION.md](UI_DOCUMENTATION.md)** - UI/UX specifications
- **[API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)** - Backend integration guide
- **[backend/README.md](backend/README.md)** - Backend API documentation
- **[backend_docs/BACKEND_IMPLEMENTATION.md](backend_docs/BACKEND_IMPLEMENTATION.md)** - API specification

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse
- **CORS**: Configured for security
- **Helmet**: Security headers
- **Input Validation**: Mongoose schema validation

## Future Enhancements

- Barcode scanning for quick food lookup
- Recipe management and tracking
- Meal planning and suggestions
- Social features (share meals with friends)
- Integration with fitness trackers
- Photo-based food recognition
- Export data functionality
- Push notifications for meal reminders

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository.