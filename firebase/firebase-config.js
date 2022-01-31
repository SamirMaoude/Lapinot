// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth'
import { i } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJhfQIn-9a0ww53nx8evQakmu0MElN4gE",
  authDomain: "lapinot-ba74b.firebaseapp.com",
  projectId: "lapinot-ba74b",
  storageBucket: "lapinot-ba74b.appspot.com",
  messagingSenderId: "473539461209",
  appId: "1:473539461209:web:7a02dd7ca60a462c2fb148",
  measurementId: "G-GZWY9JHSQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
// export const db = getFirestore(app);
// enableIndexedDbPersistence(db);

export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});