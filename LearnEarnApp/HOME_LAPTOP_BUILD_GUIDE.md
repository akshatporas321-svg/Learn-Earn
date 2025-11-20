# Build APK from Git Repository - Home Laptop Guide

## Prerequisites Setup on Home Laptop

### 1. Install Required Software
```bash
# Install Node.js (v18 or higher)
# Download from: https://nodejs.org/

# Install Git
# Download from: https://git-scm.com/

# Install Android Studio
# Download from: https://developer.android.com/studio
```

### 2. Configure Android Development Environment
```bash
# Set environment variables (add to system PATH)
ANDROID_HOME=C:\Users\[USERNAME]\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr

# Add to PATH:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%JAVA_HOME%\bin
```

## Step-by-Step APK Build Process

### Step 1: Clone Repository
```bash
# Clone your repository
git clone https://github.com/akshatporas321-svg/Learn-Earn.git
cd Learn-Earn
```

### Step 2: Setup React Native Project
```bash
# Navigate to the React Native app directory
cd LearnEarnApp

# Install dependencies
npm install

# Install React Native CLI globally
npm install -g @react-native-community/cli
```

### Step 3: Setup Android Project
```bash
# Navigate to android directory
cd android

# Clean any previous builds
./gradlew clean

# Generate release build
./gradlew assembleRelease
```

### Step 4: Alternative Method - Using Android Studio
```bash
# Open Android Studio
# File -> Open -> Select LearnEarnApp/android folder
# Let Gradle sync complete
# Build -> Generate Signed Bundle/APK -> Choose APK
# Select release variant
# Build APK
```

## APK Generation Commands

### Debug APK (for testing)
```bash
cd LearnEarnApp/android
./gradlew assembleDebug
```
**APK Location:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution)
```bash
cd LearnEarnApp/android
./gradlew assembleRelease
```
**APK Location:** `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Signed Release APK (recommended)
```bash
# Generate keystore first
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Build signed APK
cd LearnEarnApp/android
./gradlew assembleRelease
```

## Quick Build Script for Home Laptop

Create `build-apk.bat`:
```batch
@echo off
echo Building Learn & Earn APK...

REM Set environment variables
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=C:\Program Files\nodejs;%ANDROID_HOME%\platform-tools;%JAVA_HOME%\bin;%PATH%

REM Clone repository (if not already cloned)
REM git clone https://github.com/akshatporas321-svg/Learn-Earn.git

REM Navigate to project
cd Learn-Earn\LearnEarnApp

REM Install dependencies
echo Installing dependencies...
npm install

REM Build APK
echo Building APK...
cd android
gradlew clean
gradlew assembleRelease

echo APK built successfully!
echo Location: android\app\build\outputs\apk\release\
pause
```

## Expected Build Output

### Successful Build
```
BUILD SUCCESSFUL in 2m 30s
47 actionable tasks: 47 executed

Generated APK: app-release-unsigned.apk
Size: ~25-30 MB
```

### APK File Locations
- **Debug APK:** `LearnEarnApp/android/app/build/outputs/apk/debug/app-debug.apk` 
- **Release APK:** `LearnEarnApp/android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Installing APK on Device

### Method 1: ADB Install
```bash
# Connect Android device via USB (enable USB debugging)
adb devices
adb install app-release-unsigned.apk
```

### Method 2: Direct Transfer
```bash
# Copy APK to device storage
# Enable "Install from Unknown Sources" in device settings
# Open file manager and install APK
```

## Troubleshooting on Home Laptop

### If Build Fails
```bash
# Clear caches
npm cache clean --force
cd LearnEarnApp/android
./gradlew clean

# Reset node modules
rm -rf node_modules
npm install
```

### Network Issues
```bash
# Should not occur on home network
# All repositories should be accessible
# Build should complete successfully
```

## What You'll Get

### Complete Learn & Earn App Features:
- ✅ Beautiful login/registration screens
- ✅ Project browsing interface
- ✅ File upload functionality
- ✅ Modern Material Design UI
- ✅ Full backend integration
- ✅ Ready-to-install APK file

## File Structure After Build
```
Learn-Earn/
├── LearnEarnApp/
│   ├── android/
│   │   └── app/build/outputs/apk/
│   │       ├── debug/app-debug.apk
│   │       └── release/app-release-unsigned.apk
│   ├── src/screens/ (all 7 screens)
│   ├── App.tsx
│   └── package.json
└── server-dev.js (backend server)
```

## Expected Timeline
- **Setup time:** 30-60 minutes (first time)
- **Build time:** 5-10 minutes (subsequent builds)
- **APK size:** ~25-30 MB
- **Target devices:** Android 7.0+ (API 24+)

The home laptop build should work perfectly since there won't be corporate network restrictions blocking the required repositories!