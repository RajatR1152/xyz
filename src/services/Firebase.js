import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB_hN2Habk8RdGCodiSGRasvAu15sYHxok",
  authDomain: "timepass-f71a6.firebaseapp.com",
  projectId: "timepass-f71a6",
  storageBucket: "timepass-f71a6.appspot.com",
  messagingSenderId: "210632622949",
  appId: "1:210632622949:web:27e95064e81e9a5e54d78c",
  measurementId: "G-QQPLEFCB3G"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getFirestore(app);