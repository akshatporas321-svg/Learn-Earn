# Quick Android App Test Guide

## Current Status:
- ✅ Emulator is running (emulator-5554)
- ✅ Metro bundler is running
- ❌ App build failing due to SSL certificate issues

## To Check Your App Right Now:

### Method 1: Visual Check
1. **Look for the emulator window** - It should show Android home screen
2. **Check taskbar** for "Android Emulator" 
3. **Alt+Tab** to cycle through windows

### Method 2: Manual App Installation
Since there are SSL certificate issues with the build, let's try these steps:

1. **Open a new PowerShell window and run:**
```powershell
cd "C:\Users\vmethi\IdeaProjects\Learn-Earn\LearnEarnApp"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools"

# Check emulator
adb devices

# Open app drawer on emulator
adb shell input keyevent 82

# Try building with relaxed SSL
npx react-native run-android --verbose
```

### Method 3: Using Android Studio (Most Reliable)
1. **Open Android Studio**
2. **File → Open** → Navigate to `LearnEarnApp/android` folder
3. **Click "Sync Project with Gradle Files"** (sync icon)
4. **Run → Run 'app'** (or click green play button)

### Method 4: Debug the SSL Issue
Add this to `android/gradle.properties`:
```
org.gradle.jvmargs=-Djavax.net.ssl.trustStore=none -Djavax.net.ssl.trustStoreType=
```

### What You Should See When It Works:
1. **Emulator boots** to Android home screen
2. **App installs** (you'll see "Installing..." message)
3. **App launches** automatically showing your **Learn & Earn login screen**
4. **Features available:**
   - Beautiful gradient login screen
   - Registration for students/companies
   - Project browsing
   - File uploads
   - Modern UI design

### Current Workaround:
The SSL certificate issue is preventing the Gradle build. This is common in corporate networks or with certain antivirus software.

**Try Method 3 (Android Studio)** as it often handles SSL issues better than command line builds.