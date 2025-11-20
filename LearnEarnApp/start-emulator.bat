@echo off
echo ========================================
echo   Android Emulator Launcher (Alternative)
echo ========================================
echo.

REM Set up environment variables
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%PATH%;C:\Program Files\nodejs;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%JAVA_HOME%\bin

echo Killing any existing emulator processes...
taskkill /f /im "emulator.exe" /im "qemu-system-x86_64.exe" 2>nul

echo.
echo Starting emulator with software rendering (should be more visible)...
echo Please wait 30-60 seconds for the emulator to fully load...
echo.

REM Try different emulator configurations
echo Attempting to start emulator with software graphics...
start "Android Emulator" cmd /c ""%ANDROID_HOME%\emulator\emulator.exe" -avd Medium_Phone_API_36.1 -gpu swiftshader_indirect -no-snapshot-load -skin 1080x1920 -memory 2048 -partition-size 2048"

echo.
echo Emulator is starting in a separate window...
echo Look for the Android emulator window or check your taskbar
echo.
echo Waiting 40 seconds for emulator to boot...
timeout /t 40 /nobreak

echo.
echo Checking device status...
adb devices

echo.
echo Starting Metro bundler...
cd /d "%~dp0"
start "Metro Bundler" cmd /k "npx react-native start"

echo.
echo Waiting for Metro to initialize...
timeout /t 8 /nobreak

echo.
echo Running the Learn & Earn app...
npx react-native run-android

echo.
echo ==================================================
echo If you don't see the emulator window:
echo 1. Check your taskbar for "Android Emulator"
echo 2. Try Alt+Tab to switch between windows
echo 3. Look for a black window that might be loading
echo 4. Or open Android Studio and use AVD Manager
echo ==================================================
echo.
pause