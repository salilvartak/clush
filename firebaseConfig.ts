import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import { Platform } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASpmkgC9Ts3D-UgKeGy2jLT9j6_Q_Du2E",
  authDomain: "clush-9d323.firebaseapp.com",
  projectId: "clush-9d323",
  storageBucket: "clush-9d323.firebasestorage.app",
  messagingSenderId: "885455459982",
  appId: "1:885455459982:web:acee3dc6223870415a5bdf",
  measurementId: "G-MV2X6KSNHP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

let persistence;

if (Platform.OS === "web") {
  persistence = browserLocalPersistence;
} else {
  // Extract getReactNativePersistence unsafely to bypass the missing type definition
  // This block only runs on native, preventing the "not a function" error on web
  const reactNativePersistence = (firebaseAuth as any)
    .getReactNativePersistence;
  persistence = reactNativePersistence(ReactNativeAsyncStorage);
}

export const auth = initializeAuth(app, {
  persistence,
});
