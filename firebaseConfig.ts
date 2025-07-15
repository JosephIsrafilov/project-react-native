import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1rJOzAuCmP_zVU-e9DiTAb-9WM4SQf1Y",
  authDomain: "silentmoon-c0bc9.firebaseapp.com",
  projectId: "silentmoon-c0bc9",
  storageBucket: "silentmoon-c0bc9.firebasestorage.app",
  messagingSenderId: "333539677036",
  appId: "1:333539677036:web:7707004d112f037cff5949",
  measurementId: "G-WF0VJDQCJ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);