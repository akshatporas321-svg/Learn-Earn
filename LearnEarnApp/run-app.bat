@echo off
echo ========================================
echo    Learn & Earn Android App Runner
echo ========================================
echo.

REM Set up environment variables
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%PATH%;C:\Program Files\nodejs;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%JAVA_HOME%\bin

echo Setting up environment...
echo ANDROID_HOME: %ANDROID_HOME%
echo JAVA_HOME: %JAVA_HOME%
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Checking for connected devices/emulators...
adb devices
echo.

echo Killing any existing emulator processes...
taskkill /f /im "emulator.exe" /im "qemu-system-x86_64.exe" 2>nul

echo.
echo Starting emulator with fixed graphics settings...
echo This may take 30-60 seconds to fully boot...
start "Android Emulator" "%ANDROID_HOME%\emulator\emulator.exe" -avd Medium_Phone_API_36.1 -gpu swiftshader_indirect -no-snapshot-load -wipe-data -skin 1080x1920

echo.
echo Waiting for emulator to boot (30 seconds)...
timeout /t 30 /nobreak > nul

echo.
echo Starting React Native Metro bundler in background...
start "Metro Bundler" cmd /k "npx react-native start"

echo.
echo Waiting for Metro to start (5 seconds)...
timeout /t 5 /nobreak > nul

echo.
echo Checking emulator status...
adb devices

echo.
echo Running React Native Android app...
npx react-native run-android

echo.
echo App launch completed!
echo If the emulator window is not visible, check your taskbar or try Alt+Tab
echo.
pause