// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "tiny-steps-a-day-44449.firebaseapp.com",
  projectId: "tiny-steps-a-day-44449",
  storageBucket: "tiny-steps-a-day-44449.firebasestorage.app",
  messagingSenderId: "417104073500",
  appId: "1:417104073500:web:c195ff6163f1171359a0d9",
  measurementId: "G-491Q5ZW28Y"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);