@echo off
echo Setting up Android Development Environment...
echo.

REM Set environment variables
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%PATH%;C:\Program Files\nodejs;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%JAVA_HOME%\bin

echo Environment variables set:
echo ANDROID_HOME=%ANDROID_HOME%
echo JAVA_HOME=%JAVA_HOME%
echo.

echo Checking installations...
java -version
echo.
adb version
echo.

echo Checking for connected devices...
adb devices
echo.

echo Starting React Native bundler...
start "Metro Bundler" cmd /k "cd /d %~dp0 && npx react-native start"

echo.
echo Waiting 5 seconds for bundler to start...
timeout /t 5 /nobreak > nul

echo.
echo Running Android app...
npx react-native run-android

echo.
pause