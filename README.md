# FeedEasy React Native App

Created: 2025-07-22T11:23:24.840060 UTC

## Setup

1. Create new Expo app:
```
npx create-expo-app feedeasy-app
cd feedeasy-app
```

2. Install dependencies:
```
npm install axios @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

3. Copy all files from this package into your project root.

4. Edit `src/config/api.js` to match your Django backend IP.

5. Run:
```
npm start
```
