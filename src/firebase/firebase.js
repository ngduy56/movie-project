import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo-2pEj-UaoWRi6Zp5Xt4RdrUiTMBFbRo",
  authDomain: "disneyplus-clone-project.firebaseapp.com",
  projectId: "disneyplus-clone-project",
  storageBucket: "disneyplus-clone-project.appspot.com",
  messagingSenderId: "1046639932043",
  appId: "1:1046639932043:web:2c18ddea7dc1a8638c9a8e",
  measurementId: "G-LEM50THPYB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

export { auth, provider, storage };

export default db;