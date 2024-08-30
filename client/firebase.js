// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shelfwise-e499b.firebaseapp.com",
  projectId: "shelfwise-e499b",
  storageBucket: "shelfwise-e499b.appspot.com",
  messagingSenderId: "433581885056",
  appId: "1:433581885056:web:8ad910ef7f01c37db90865",
  measurementId: "G-EFZET167MS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);