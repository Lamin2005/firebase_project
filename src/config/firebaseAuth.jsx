// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsBHcoe0QbBDCAcd02eXFOevJRIHXfYls",
  authDomain: "moneytracker-5d71e.firebaseapp.com",
  projectId: "moneytracker-5d71e",
  storageBucket: "moneytracker-5d71e.firebasestorage.app",
  messagingSenderId: "896898506923",
  appId: "1:896898506923:web:8c3a3453f4c105e8f557ee",
  measurementId: "G-14LCRVFMW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
