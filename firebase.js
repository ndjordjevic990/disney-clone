import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwTJ8aLesXykEQXoquK5LEBXLzsaiWBXE",
  authDomain: "disney-clone-nd.firebaseapp.com",
  projectId: "disney-clone-nd",
  storageBucket: "disney-clone-nd.appspot.com",
  messagingSenderId: "884554363891",
  appId: "1:884554363891:web:80350896f8fd1903eb1886",
};

// If my app is not initilized - initialize it. If there is keep using the same app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
