import {initializeApp} from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  getFirestore, 
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
  query,
  where,
  getDocs
} from "firebase/firestore";

// configuration for the specific firebase project
const firebaseConfig = {};

// initializing firebase and all of the necessary components
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// exports the functions to be used in other files
export {
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  collection,
  setDoc,
  doc,
  getDoc,
  onAuthStateChanged,
  signOut,
  updateDoc,
  arrayUnion,
  increment,
  query,
  where,
  getDocs,
}