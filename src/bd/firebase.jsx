
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0eZF_-LsEuCeLaEmTF4BGf0JOnTinGXk",
  authDomain: "web-proyect-c3a92.firebaseapp.com",
  projectId: "web-proyect-c3a92",
  storageBucket: "web-proyect-c3a92.firebasestorage.app",
  messagingSenderId: "61395359320",
  appId: "1:61395359320:web:452257cbfa33b771335c2d"
};

const app = getApps().find(app => app.name === 'mainApp') 
  || initializeApp(firebaseConfig, 'mainApp');

const db = getFirestore(app);

export { app, db };
