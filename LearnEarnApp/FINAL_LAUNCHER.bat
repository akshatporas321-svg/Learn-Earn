@echo off
echo =====================================
echo   LEARN & EARN APP - FINAL LAUNCHER
echo =====================================
echo.

echo 🔍 STEP 1: Check if emulator is visible
echo Look for the Android emulator window on your screen
echo - Check taskbar for "Android Emulator" 
echo - Try Alt+Tab to find emulator window
echo - Look for phone-shaped window showing Android
echo.
pause

echo.
echo 🚀 STEP 2: Launch using Android Studio (RECOMMENDED)
echo.
echo Please follow these steps:
echo 1. Open Android Studio
echo 2. Click "Open an Existing Project"
echo 3. Navigate to: C:\Users\vmethi\IdeaProjects\Learn-Earn\LearnEarnApp
echo 4. Select the "LearnEarnApp" folder and click OK
echo 5. Wait for project to load and sync
echo 6. Click the green ▶️ play button (or Run > Run 'app')
echo 7. Select your running emulator
echo 8. Your Learn & Earn app will install and launch!
echo.
echo ✨ Your app features:
echo - Beautiful login screen with gradients
echo - Student/Company registration
echo - Project browsing with sample data
echo - File upload functionality
echo - Modern Material Design UI
echo.
pause

echo.
echo 🔧 ALTERNATIVE: Try command line again
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%PATH%;C:\Program Files\nodejs;%ANDROID_HOME%\platform-tools

echo Environment set. Trying to run the app...
cd /d "%~dp0"
adb devices
echo.
npx react-native run-android --verbose

echo.
echo =====================================
echo If you see your app on the emulator, 
echo you can test these features:
echo - Login/Registration
echo - Browse sample projects  
echo - Submit work files
echo - Company project publishing
echo =====================================
pause