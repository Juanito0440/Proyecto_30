// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEG1u0mMgLgDsZJnHU1hPcZaD-3lP9HRo",
  authDomain: "db-projects-e131f.firebaseapp.com",
  projectId: "db-projects-e131f",
  storageBucket: "db-projects-e131f.firebasestorage.app",
  messagingSenderId: "998709890873",
  appId: "1:998709890873:web:88275320e8370b6041a2e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);