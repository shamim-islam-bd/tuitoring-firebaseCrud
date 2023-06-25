// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <- needed if using firestore db
import { getStorage } from "firebase/storage"; // <- needed if using storage for files


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpccSWVkcRayEe8fxA3Vu4MFJat7cUrts",
  authDomain: "crud-tuitor-accac.firebaseapp.com",
  projectId: "crud-tuitor-accac",
  storageBucket: "crud-tuitor-accac.appspot.com",
  messagingSenderId: "76336575922",
  appId: "1:76336575922:web:dd70aa47fd7769bf86a0ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const auth = getAuth();


