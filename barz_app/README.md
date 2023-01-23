# DEV setup

This react native app was created using `yarn create expo-app barz_app`.  You can check out the documentation [here](https://docs.expo.dev/get-started/create-a-new-app/)

The dev environment uses something called [Expo](https://expo.dev/) which allows us to create a mobile device simulator in order to test our code.  

## Commands

* `yarn`: Installs all the dependencies from `yarn.lock` to your local environment
* `yarn start`: Starts an instance of Expo.  If you have the Expo app installed on your mobile device, you can scan the QR code and it will run on your mobile device
* `yarn ios`: Runs the ios version of the app.  If you have XCode installed, it will auto open an ios simulator
* `yarn android`: Runs the android version of the app
* `eas build --profile preview --platform ios`: Builds developmental build to [eas](https://expo.dev/accounts/ryanlee/projects/barz_app/builds)

## References
* Creating camera using `expo-camera`: [Source](https://github.com/imrohit007/Video-Recording-React-Native-Expo)
* Using `NavigationController` for `App.tsx`: [Source](https://reactnative.dev/docs/navigation)
* Using `eas` for developmental builds (necessary to test [ffmpeg](https://github.com/arthenica/ffmpeg-kit/tree/main/react-native)): [Source](https://docs.expo.dev/build/setup/)