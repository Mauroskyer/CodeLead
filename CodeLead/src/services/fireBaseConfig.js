// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd_4DDSpCde1fHhJrDY4enGeiNMQBlr-4",
  authDomain: "codelead-5ba48.firebaseapp.com",
  projectId: "codelead-5ba48",
  storageBucket: "codelead-5ba48.firebasestorage.app",
  messagingSenderId: "859333872774",
  appId: "1:859333872774:web:6ef8e0bcd23f65668cd507",
  measurementId: "G-Q65ZN4Z7WW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
