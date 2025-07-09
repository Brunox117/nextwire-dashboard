// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE-plpz36TffvPOJMyvnmkZ0AGyDBqG7w",
  authDomain: "nextwire-b1612.firebaseapp.com",
  projectId: "nextwire-b1612",
  storageBucket: "nextwire-b1612.firebasestorage.app",
  messagingSenderId: "1041342035707",
  appId: "1:1041342035707:web:3fdcedae6a4fbf4b27a25e",
  measurementId: "G-JEL77RLTGN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const FirebaseAuth = getAuth(app);
export const FirebaseDB = getFirestore(app);
export const FirebaseSTORAGE = getStorage(app);
