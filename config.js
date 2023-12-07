import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDFtuHLJAjM0TMOesGHgQcB_kEFGjV1TTU",
  authDomain: "home-inventory-78d66.firebaseapp.com",
  projectId: "home-inventory-78d66",
  storageBucket: "home-inventory-78d66.appspot.com",
  messagingSenderId: "587763967807",
  appId: "1:587763967807:web:a33a01215492060c1e558a",
  measurementId: "G-BBX03FCPT0",
});

export const auth = app.auth();
export const db = getFirestore();
export const storage = getStorage(app);
export default app;
