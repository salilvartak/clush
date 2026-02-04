// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
