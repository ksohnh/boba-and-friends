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

const firebaseConfig = {
  apiKey: 'AIzaSyDSXovsvfmhq07wuzgZHqDJtDgZ21u4xY8',
  authDomain: 'bobaandfriends-33d26.firebaseapp.com',
  databaseURL: 'bobaandfriends.firebaseio.com',
  projectId: 'bobaandfriends-33d26',
  storageBucket: 'bobaandfriends-33d26.appspot.com',
  messagingSenderId: '919066001466',
  appId: '1:919066001466:ios:0a8566867ad4d13225f503',
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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