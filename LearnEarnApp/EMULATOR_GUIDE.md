# Android Emulator Troubleshooting Guide

## If the emulator is not visible after running the batch file:

### Method 1: Check Taskbar and Windows
1. **Check your taskbar** - Look for "Android Emulator" or "emulator" in the taskbar
2. **Press Alt+Tab** - The emulator might be running but not in focus
3. **Look for black/loading windows** - The emulator might still be booting
4. **Check Task Manager** - Look for "emulator.exe" or "qemu-system-x86_64.exe" processes

### Method 2: Use Android Studio (Recommended)
1. **Open Android Studio**
2. **Go to Tools → AVD Manager**
3. **Click the ▶️ (Play) button** next to "Medium_Phone_API_36.1"
4. **Wait for emulator to fully boot** (shows home screen)
5. **Run the app**: Double-click `run-app.bat` OR run in terminal:
   ```
   cd "C:\Users\vmethi\IdeaProjects\Learn-Earn\LearnEarnApp"
   npx react-native run-android
   ```

### Method 3: Alternative Emulator Settings
Try running `start-emulator.bat` which uses different graphics settings:
- Software rendering instead of hardware
- Larger memory allocation
- No snapshot loading

### Method 4: Manual Terminal Commands
```batch
# Set environment
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator

# Start emulator manually
emulator -avd Medium_Phone_API_36.1 -gpu swiftshader_indirect

# In another terminal, run the app
cd "C:\Users\vmethi\IdeaProjects\Learn-Earn\LearnEarnApp"
npx react-native run-android
```

### Common Issues & Solutions:

**Black screen or blank window:**
- The emulator is booting, wait 1-2 minutes
- Try pressing Windows key + D to show desktop

**"No devices found" error:**
- Check `adb devices` shows emulator-5554
- If offline, wait longer for boot

**Graphics/OpenGL errors:**
- Use software rendering: `-gpu swiftshader_indirect`
- Update graphics drivers
- Try different emulator skin sizes

**Best Practice:**
1. **Always use Android Studio's AVD Manager** for most reliable emulator startup
2. **Wait for complete boot** before running React Native
3. **Keep emulator running** between app tests for faster development

Your Learn & Earn app is ready to run once the emulator is visible!