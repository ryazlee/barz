# Barz

A simple project with a React Native (Expo) frontend and a Node.js/Express backend.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

---

## Running the Backend

1. Open a terminal and navigate to the `server` folder:

   ```sh
   cd server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the backend in development mode:

   ```sh
   npm run dev
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

---

## Running the Frontend (Expo App)

1. Open a new terminal and navigate to the `app` folder:

   ```sh
   cd app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the Expo app:

   ```sh
   npm start
   ```

4. Follow the Expo CLI instructions to run the app on your device or emulator.

---

## Notes

- Make sure the backend is running before using features in the app that require the server.
- You can edit the code in the `app` and `server` folders and changes will reload automatically in development mode.
