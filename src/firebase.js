import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

/** Sutoor Initiative — etkan-f3ba3 — Hosting: https://sutoor.web.app — Storage: sutoor-storage */
const firebaseConfig = {
  apiKey: "AIzaSyDh2sNtgaTxIlLz9nasmzJZ9UXTJ6bmMGo",
  authDomain: "etkan-f3ba3.firebaseapp.com",
  projectId: "etkan-f3ba3",
  storageBucket: "sutoor-storage",
  messagingSenderId: "107080907120",
  appId: "1:107080907120:web:5eafe826e1440f7321b7b5",
  measurementId: "G-91WWW2EMMD",
};

const app = initializeApp(firebaseConfig);

isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});

export { app };
