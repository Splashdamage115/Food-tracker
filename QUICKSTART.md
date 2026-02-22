# 🚀 Quick Start Guide

## Get Up and Running in 5 Minutes!

This guide will help you get the Food Tracker app running quickly.

## Prerequisites Check

Do you have Flutter installed?
```bash
flutter --version
```

If not, see [SETUP.md](SETUP.md) for detailed installation instructions.

## 1. Clone & Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/Splashdamage115/Food-tracker.git
cd Food-tracker

# Get dependencies
flutter pub get
```

## 2. Run the App (1 minute)

```bash
# Run on your connected device/emulator
flutter run
```

Or choose a specific device:
```bash
# List devices
flutter devices

# Run on web
flutter run -d chrome

# Run on Android
flutter run -d android

# Run on iOS (macOS only)
flutter run -d ios
```

## 3. Login (30 seconds)

The app uses mock authentication. Use any credentials:

- **Email**: `test@example.com` (or any email format)
- **Password**: `password123` (minimum 6 characters)

## 4. Try the App! (1.5 minutes)

1. **View the Dashboard**: See the daily summary
2. **Add Food**: Tap the "+ Add Food" button
3. **Search**: Try searching for "chicken" or "apple"
4. **Add Entry**: Select a food, adjust servings, choose meal type
5. **View Summary**: See your progress update automatically
6. **Delete**: Remove entries by tapping the delete icon

## 🎯 What Can You Do?

### Current Features (with Mock Data)
- ✅ Login/Logout
- ✅ Search 10 sample foods
- ✅ Add food entries with custom servings
- ✅ Categorize by meal type
- ✅ View nutritional breakdown
- ✅ Track daily totals
- ✅ Navigate by date
- ✅ Delete entries

### Sample Foods Available
1. Apple (52 cal)
2. Banana (89 cal)
3. Chicken Breast (165 cal)
4. Brown Rice (111 cal)
5. Broccoli (34 cal)
6. Eggs (72 cal)
7. Salmon (208 cal)
8. Greek Yogurt (59 cal)
9. Oatmeal (389 cal)
10. Almonds (579 cal)

## 📱 Platform Support

- ✅ Android
- ✅ iOS
- ✅ Web
- ✅ Windows
- ✅ macOS
- ✅ Linux

## 🔧 Troubleshooting

### Error: "Flutter not found"
→ Install Flutter: See [SETUP.md](SETUP.md)

### Error: "No devices found"
→ Start an emulator or connect a device:
```bash
# Android
# Open Android Studio > AVD Manager > Start Emulator

# iOS
# Open Xcode > Open Simulator

# Web
# Automatically uses Chrome
```

### Error: "Dependencies failed"
→ Clean and reinstall:
```bash
flutter clean
flutter pub get
```

### App won't build?
→ Check Flutter doctor:
```bash
flutter doctor -v
```

## 📚 Next Steps

### For Developers
1. Read [TESTING.md](TESTING.md) - Test all features
2. Review the code in `lib/` - Understand the structure
3. Check [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) - Learn how to connect to backend

### For Backend Developers
1. Read [backend_docs/BACKEND_IMPLEMENTATION.md](backend_docs/BACKEND_IMPLEMENTATION.md)
2. Implement the REST API
3. Follow the integration guide to connect

### For Everyone
- Read [README.md](README.md) - Full project overview
- Check [UI_DOCUMENTATION.md](UI_DOCUMENTATION.md) - Design specifications
- See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Complete feature list

## 💡 Tips

1. **Hot Reload**: Press `r` in terminal to reload changes instantly
2. **Hot Restart**: Press `R` to restart the app
3. **Quit**: Press `q` to stop the app
4. **DevTools**: Access Flutter DevTools for debugging
5. **Mock Data**: All data is local - safe to experiment!

## 🎨 Customize

Want to modify the app? Start with:

- **Colors**: `lib/main.dart` - Change theme colors
- **Food Data**: `lib/services/food_service.dart` - Add more foods
- **Goals**: `lib/widgets/daily_summary_card.dart` - Change daily targets
- **UI Text**: Search for strings in `lib/screens/` - Update labels

## 🚀 Deploy

Ready to deploy? Build for production:

```bash
# Android APK
flutter build apk --release

# Android App Bundle
flutter build appbundle --release

# iOS (macOS only)
flutter build ios --release

# Web
flutter build web --release

# Desktop
flutter build windows --release  # Windows
flutter build macos --release    # macOS
flutter build linux --release    # Linux
```

## 🎯 Current Limitations

Remember, this is using **mock data**:
- Authentication accepts any credentials
- Only 10 food items available
- Data stored locally only
- No real backend connection

To connect to a real backend:
→ See [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)

## 🆘 Need Help?

1. **Check Documentation**: See list above
2. **Run Flutter Doctor**: `flutter doctor -v`
3. **Check Issues**: GitHub repository issues
4. **Ask Questions**: Open a GitHub discussion

## 🎉 You're Ready!

The app is now running. Enjoy exploring the Food Tracker!

---

**Quick Links:**
- [Full Documentation](README.md)
- [Setup Guide](SETUP.md)
- [Testing Guide](TESTING.md)
- [Backend Spec](backend_docs/BACKEND_IMPLEMENTATION.md)
- [Integration Guide](API_INTEGRATION_GUIDE.md)

**Happy Tracking! 🍎🥗🍗**
