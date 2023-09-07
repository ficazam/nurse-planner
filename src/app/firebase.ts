// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArRmGwaWI0WsmJZojW0xToIw59N3BIqVM",
  authDomain: "nurse-planner.firebaseapp.com",
  projectId: "nurse-planner",
  storageBucket: "nurse-planner.appspot.com",
  messagingSenderId: "22741616935",
  appId: "1:22741616935:web:d2ea7303362d72d4494102",
  measurementId: "G-03JD4K47ZD"
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = (app.name && typeof window !== 'undefined') ? getAnalytics(app) : null;
export const db = getFirestore(app)
export const auth = getAuth()