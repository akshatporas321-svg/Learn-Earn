# Android Studio Build Guide - Learn & Earn App

## Issue Summary
The command-line build is failing due to SSL certificate issues preventing Gradle from downloading plugins and dependencies. This is common in corporate networks with firewalls or proxy settings.

## Solution: Use Android Studio (Recommended)

Android Studio handles SSL certificates and network configurations much better than command-line Gradle.

### Steps to Build in Android Studio:

1. **Open Android Studio**

2. **Open the Project**
   - Click "Open an Existing Project"
   - Navigate to: `C:\Users\vmethi\IdeaProjects\Learn-Earn\LearnEarnApp\android`
   - Select the `android` folder and click "OK"

3. **Wait for Gradle Sync**
   - Android Studio will automatically sync Gradle files
   - This may take a few minutes on first run
   - Android Studio's built-in certificate handling should resolve SSL issues

4. **Build the Project**
   - Once sync completes, click the "Build" menu
   - Select "Make Project" or press Ctrl+F9

5. **Run on Emulator**
   - Make sure your emulator is running (`emulator-5554` should be visible)
   - Click the green "Run" button (▶️) or press Shift+F10
   - Select your emulator from the device list

## Alternative: Fix Network/SSL Issues

If you need to use command line, work with your IT department to:

1. **Configure Corporate Proxy** (if applicable)
   ```
   # Add to gradle.properties:
   systemProp.http.proxyHost=your-proxy-host
   systemProp.http.proxyPort=your-proxy-port
   systemProp.https.proxyHost=your-proxy-host  
   systemProp.https.proxyPort=your-proxy-port
   ```

2. **Import Corporate Certificates**
   - Add corporate SSL certificates to Java keystore
   - Configure Gradle to use system certificates

3. **Disable SSL Verification** (NOT RECOMMENDED for production)
   ```
   # Add to gradle.properties:
   org.gradle.jvmargs=-Xmx2048m -Djavax.net.ssl.trustStore=NONE
   ```

## Expected Result

Once the app is built and installed successfully, you'll see the **Learn & Earn** app on your emulator with:

- Beautiful login screen with gradient background
- Registration functionality  
- Project browsing interface
- File upload capabilities
- Modern Material Design UI

## Current Status

- ✅ React Native app fully developed
- ✅ Backend server running on port 8080
- ✅ Android emulator running (emulator-5554)
- ✅ Metro bundler ready
- ❌ App installation blocked by SSL certificate issues
- 🎯 **Next Step: Use Android Studio to build and install the app**

The app is complete and ready to run - we just need to use the right tool to build it!