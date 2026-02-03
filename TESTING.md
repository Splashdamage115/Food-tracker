# Testing Guide for Food Tracker App

## Prerequisites

To test this Flutter application, you need to have:

1. **Flutter SDK** installed (version 3.0.0 or higher)
   - Download from: https://flutter.dev/docs/get-started/install
   
2. **Development Environment** (choose one):
   - Android Studio with Android SDK
   - Xcode (for iOS development on macOS)
   - VS Code with Flutter extension
   - Chrome browser (for web testing)

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Splashdamage115/Food-tracker.git
   cd Food-tracker
   ```

2. **Verify Flutter installation**:
   ```bash
   flutter doctor
   ```
   This command checks your environment and displays a report of the status of your Flutter installation.

3. **Install dependencies**:
   ```bash
   flutter pub get
   ```

## Running the App

### On Android Emulator/Device

1. Start an Android emulator or connect an Android device
2. Run:
   ```bash
   flutter run
   ```

### On iOS Simulator (macOS only)

1. Start an iOS simulator
2. Run:
   ```bash
   flutter run
   ```

### On Web Browser

```bash
flutter run -d chrome
```

### On Desktop

For Windows:
```bash
flutter run -d windows
```

For macOS:
```bash
flutter run -d macos
```

For Linux:
```bash
flutter run -d linux
```

## Testing Features

### 1. Login/Registration

**Test Login:**
- Open the app
- Enter any email (e.g., `test@example.com`)
- Enter any password (minimum 6 characters)
- Click "Login"
- You should be redirected to the home screen

**Test Registration:**
- On the login screen, click "Don't have an account? Register"
- Enter name, email, and password
- Click "Register"
- You should be redirected to the home screen

### 2. Home Screen

**Daily Summary:**
- View the daily nutritional summary card
- Check that all macros are displayed (Calories, Protein, Carbs, Fat)
- Progress bars should show 0% when no food is logged

**Date Selection:**
- Click on the date selector at the top
- Choose a different date
- Verify that the date updates

### 3. Adding Food

**Search and Add:**
1. Click the "Add Food" floating action button
2. Search for a food item (try: "apple", "chicken", "rice")
3. Click on a food item to see details
4. Verify nutritional information is displayed
5. Adjust servings if needed
6. Select a meal type (Breakfast, Lunch, Dinner, or Snack)
7. Click "Add to Log"
8. Verify you're returned to the home screen
9. Check that the food appears in the daily log

### 4. Food Log

**View Entries:**
- Each logged food should display:
  - Food name and brand
  - Serving size
  - Meal type icon (breakfast, lunch, dinner, snack)
  - Nutritional breakdown (calories, protein, carbs, fat)

**Delete Entries:**
- Click the delete icon on any food entry
- Confirm deletion in the dialog
- Verify the entry is removed and summary is updated

### 5. Daily Summary

**Track Progress:**
- Add multiple food items
- Watch the daily summary update in real-time
- Progress bars should reflect current intake vs. daily goals
- Goals are set to:
  - Calories: 2000 kcal
  - Protein: 100g
  - Carbs: 250g
  - Fat: 70g

### 6. Logout

**Test Logout:**
- Click the logout icon in the app bar
- Verify you're returned to the login screen
- Close and reopen the app
- Verify you're on the login screen (session cleared)

### 7. Data Persistence

**Test Local Storage:**
1. Log some food items
2. Close the app completely
3. Reopen the app
4. Login with the same credentials
5. Verify all logged food items are still there

## Mock Data

The app currently uses mock data:

**Food Database (10 items):**
1. Apple - 52 cal/100g
2. Banana - 89 cal/100g
3. Chicken Breast - 165 cal/100g
4. Brown Rice - 111 cal/100g
5. Broccoli - 34 cal/100g
6. Eggs - 72 cal/50g
7. Salmon - 208 cal/100g
8. Greek Yogurt - 59 cal/100g
9. Oatmeal - 389 cal/100g
10. Almonds - 579 cal/100g

## Expected Behavior

### Authentication
- ✅ Any non-empty credentials are accepted
- ✅ Session persists across app restarts
- ✅ Logout clears session

### Food Tracking
- ✅ Search works with partial matches
- ✅ Food entries are stored locally
- ✅ Data persists across app restarts
- ✅ Multiple servings are calculated correctly
- ✅ Daily summary updates automatically

### UI/UX
- ✅ Smooth navigation between screens
- ✅ Loading indicators during async operations
- ✅ Error messages for invalid inputs
- ✅ Confirmation dialogs for deletions
- ✅ Responsive design on different screen sizes

## Known Limitations

1. **Mock Backend**: The app uses local storage instead of a real backend
2. **Fixed Goals**: Daily nutritional goals are hardcoded (not user-customizable yet)
3. **Limited Food Database**: Only 10 food items in the mock database
4. **No User Profiles**: All users share the same local storage
5. **No Multi-device Sync**: Data is stored locally only

## Troubleshooting

### Issue: Dependencies not found
**Solution**: Run `flutter pub get`

### Issue: Build errors
**Solution**: 
```bash
flutter clean
flutter pub get
flutter run
```

### Issue: App won't start
**Solution**: Check that an emulator/device is running with `flutter devices`

### Issue: Hot reload not working
**Solution**: Stop and restart with `flutter run`

## Performance Testing

The app should:
- Launch in under 3 seconds
- Search respond in under 500ms
- Add food complete in under 1 second
- Navigate between screens smoothly (60fps)
- Use minimal memory (~100MB)

## Next Steps

After testing the current implementation:
1. Review the backend documentation in `backend_docs/BACKEND_IMPLEMENTATION.md`
2. Implement the backend API
3. Replace mock services with real API calls
4. Add more comprehensive food database
5. Implement user profiles and customizable goals
6. Add advanced features (barcode scanning, meal planning, etc.)

## Reporting Issues

If you encounter any bugs or issues during testing:
1. Check if it's a known limitation (see above)
2. Try the troubleshooting steps
3. If unresolved, open an issue on GitHub with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Device/platform information
