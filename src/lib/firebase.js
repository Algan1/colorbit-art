import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAalO5_b7JobFUZlBhs2X2mF3lZhWjgWmM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "colorbit-b04e1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "colorbit-b04e1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "colorbit-b04e1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "379240783016",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:379240783016:web:01e823301628cc7308f69d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-15LXDN1D6V",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://colorbit-b04e1-default-rtdb.firebaseio.com",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);
