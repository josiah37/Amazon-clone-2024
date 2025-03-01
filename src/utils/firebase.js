// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGmVmJ_eQK0DYLRfzmh83ihyPxQ_D540Q",
  authDomain: "clone-69834.firebaseapp.com",
  projectId: "clone-69834",
  storageBucket: "clone-69834.firebasestorage.app",
  messagingSenderId: "232648139842",
  appId: "1:232648139842:web:2fbb32cac3c5afde5279db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);