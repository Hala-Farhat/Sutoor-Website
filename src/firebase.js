import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhuLQyrXVB8cXujIYlxx986qoGbfT5_BE",
  authDomain: "sutoor-initiative.firebaseapp.com",
  projectId: "sutoor-initiative",
  storageBucket: "sutoor-initiative.firebasestorage.app",
  messagingSenderId: "772388847935",
  appId: "1:772388847935:web:d4981cb5e65c2f2717138a",
  measurementId: "G-1ZFD7DXKR9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
