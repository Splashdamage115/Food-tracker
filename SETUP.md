# Development Setup Guide

## Overview

This guide will help you set up the development environment for the Food Tracker Flutter application.

## System Requirements

- **Operating System**: Windows 10+, macOS 10.14+, or Linux (64-bit)
- **Disk Space**: At least 2.8 GB (excluding IDE/tools)
- **RAM**: Minimum 4 GB, 8 GB recommended

## Step 1: Install Flutter

### Windows

1. Download Flutter SDK from [flutter.dev](https://flutter.dev/docs/get-started/install/windows)
2. Extract the zip file to `C:\src\flutter`
3. Add Flutter to your PATH:
   - Search for "Environment Variables" in Windows
   - Add `C:\src\flutter\bin` to PATH
4. Verify installation:
   ```bash
   flutter doctor
   ```

### macOS

1. Download Flutter SDK from [flutter.dev](https://flutter.dev/docs/get-started/install/macos)
2. Extract to desired location:
   ```bash
   cd ~/development
   unzip ~/Downloads/flutter_macos_x.x.x-stable.zip
   ```
3. Add to PATH in `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export PATH="$PATH:`pwd`/flutter/bin"
   ```
4. Verify installation:
   ```bash
   flutter doctor
   ```

### Linux

1. Download Flutter SDK
2. Extract:
   ```bash
   cd ~/development
   tar xf ~/Downloads/flutter_linux_x.x.x-stable.tar.xz
   ```
3. Add to PATH in `~/.bashrc`:
   ```bash
   export PATH="$PATH:~/development/flutter/bin"
   ```
4. Verify installation:
   ```bash
   flutter doctor
   ```

## Step 2: Install Platform-Specific Dependencies

### For Android Development

1. **Install Android Studio**:
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Install Android SDK, Android SDK Command-line Tools, and Android SDK Build-Tools

2. **Set up Android Emulator**:
   - Open Android Studio
   - Go to Tools > AVD Manager
   - Create a new Virtual Device
   - Choose a device definition and system image
   - Start the emulator

3. **Accept Android Licenses**:
   ```bash
   flutter doctor --android-licenses
   ```

### For iOS Development (macOS only)

1. **Install Xcode**:
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
     sudo xcodebuild -runFirstLaunch
     ```

2. **Install CocoaPods**:
   ```bash
   sudo gem install cocoapods
   ```

3. **Set up iOS Simulator**:
   - Open Xcode
   - Go to Xcode > Preferences > Components
   - Download an iOS Simulator

### For Web Development

Web support is included in Flutter by default. To enable:
```bash
flutter config --enable-web
```

### For Desktop Development

#### Windows
```bash
flutter config --enable-windows-desktop
```

#### macOS
```bash
flutter config --enable-macos-desktop
```

#### Linux
```bash
flutter config --enable-linux-desktop
```

## Step 3: Choose an IDE

### Option 1: Visual Studio Code (Recommended for beginners)

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install Flutter extension:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Flutter"
   - Install "Flutter" by Dart Code

### Option 2: Android Studio

1. Already installed if you set up Android development
2. Install Flutter plugin:
   - Go to Preferences/Settings > Plugins
   - Search for "Flutter"
   - Install Flutter plugin (includes Dart)

### Option 3: IntelliJ IDEA

1. Download from [jetbrains.com](https://www.jetbrains.com/idea/)
2. Install Flutter plugin (same as Android Studio)

## Step 4: Clone and Setup Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Splashdamage115/Food-tracker.git
   cd Food-tracker
   ```

2. **Get dependencies**:
   ```bash
   flutter pub get
   ```

3. **Verify setup**:
   ```bash
   flutter doctor -v
   ```
   
   Ensure all checkmarks are green for your target platform.

## Step 5: Run the Application

### Using Command Line

1. **List available devices**:
   ```bash
   flutter devices
   ```

2. **Run on specific device**:
   ```bash
   flutter run -d <device_id>
   ```

3. **Run in release mode**:
   ```bash
   flutter run --release
   ```

### Using IDE

#### VS Code:
1. Open the project folder
2. Select a device from the status bar (bottom right)
3. Press F5 or click "Run > Start Debugging"

#### Android Studio:
1. Open the project
2. Select a device from the device dropdown
3. Click the Run button (green triangle)

## Common Commands

```bash
# Get package dependencies
flutter pub get

# Run the app
flutter run

# Run tests
flutter test

# Build for production
flutter build apk          # Android
flutter build ios          # iOS
flutter build web          # Web
flutter build windows      # Windows
flutter build macos        # macOS
flutter build linux        # Linux

# Clean build files
flutter clean

# Update Flutter
flutter upgrade

# Check for issues
flutter doctor

# Format code
flutter format .

# Analyze code
flutter analyze
```

## Development Tips

### Hot Reload
- Press `r` in the terminal while app is running
- Or save your file in IDE (if hot reload is enabled)
- Changes appear instantly without rebuilding

### Hot Restart
- Press `R` in the terminal
- Restarts the app without rebuilding

### DevTools
```bash
flutter pub global activate devtools
flutter pub global run devtools
```

### Debugging
- Use `print()` statements
- Set breakpoints in IDE
- Use Flutter DevTools for advanced debugging

## Project Structure

```
Food-tracker/
├── android/              # Android-specific code
├── ios/                  # iOS-specific code
├── lib/                  # Dart source code
│   ├── main.dart        # App entry point
│   ├── models/          # Data models
│   ├── providers/       # State management
│   ├── screens/         # UI screens
│   ├── services/        # Business logic
│   └── widgets/         # Reusable widgets
├── test/                # Test files
├── backend_docs/        # Backend documentation
├── pubspec.yaml         # Dependencies
└── README.md           # Project documentation
```

## Troubleshooting

### Issue: `flutter: command not found`
**Solution**: Add Flutter to your PATH (see Step 1)

### Issue: Android licenses not accepted
**Solution**: Run `flutter doctor --android-licenses`

### Issue: Xcode not configured
**Solution**: Run `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`

### Issue: CocoaPods not installed
**Solution**: Run `sudo gem install cocoapods`

### Issue: Dependencies fail to resolve
**Solution**: 
```bash
flutter clean
flutter pub get
```

### Issue: Build fails
**Solution**:
```bash
flutter clean
flutter pub get
flutter run
```

## Additional Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Flutter Samples](https://flutter.dev/samples)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Provider Package](https://pub.dev/packages/provider)
- [Flutter Community](https://flutter.dev/community)

## Getting Help

- Check [Flutter FAQ](https://flutter.dev/docs/resources/faq)
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)
- Join [Flutter Discord](https://discord.gg/flutter)
- Read the project [README.md](README.md) and [TESTING.md](TESTING.md)

## Next Steps

1. Complete the setup using this guide
2. Read the [TESTING.md](TESTING.md) guide
3. Review the code structure in `lib/`
4. Check backend requirements in `backend_docs/BACKEND_IMPLEMENTATION.md`
5. Start developing!

Happy coding! 🚀
