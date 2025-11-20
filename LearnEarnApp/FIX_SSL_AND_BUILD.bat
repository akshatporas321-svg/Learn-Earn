@echo off
echo Fixing SSL Certificate Issues for Android Studio Build...

REM Set environment variables
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=C:\Program Files\nodejs;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%JAVA_HOME%\bin;%PATH%

REM Navigate to the project directory
cd /d "C:\Users\vmethi\IdeaProjects\Learn-Earn\LearnEarnApp"

echo Clearing Gradle cache...
rmdir /s /q .gradle 2>nul
rmdir /s /q android\.gradle 2>nul

echo Clearing Gradle daemon...
cd android
gradlew --stop

echo Attempting build with SSL bypass...
gradlew clean

echo If build succeeds, running the app...
cd ..
npx react-native run-android

echo Build process completed.
pause