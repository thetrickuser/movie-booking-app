import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2PxjS7IF5PxCqWb4uWPJRXnnTwW6LfgI",
  authDomain: "moviesmagic-105ec.firebaseapp.com",
  projectId: "moviesmagic-105ec",
  storageBucket: "moviesmagic-105ec.appspot.com",
  messagingSenderId: "75949901427",
  appId: "1:75949901427:web:6b6bcf4e9e4eb3b2478c06"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth};