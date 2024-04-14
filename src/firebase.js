import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "gestionnotes-3b3e2.firebaseapp.com",
  projectId: "gestionnotes",
  storageBucket: "gestionnotes.appspot.com",
  messagingSenderId: "1032323253037",
  appId: "1:1032323253037:web:af8ecd2264ed01e22c49a4",
  measurementId: "G-STFZ5F7N6F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
