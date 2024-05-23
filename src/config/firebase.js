import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB_rFAsEN5svK_uuDrWJJ3LDlpDyu5TNlg",
    authDomain: "chat-app-bf69e.firebaseapp.com",
    projectId: "chat-app-bf69e",
    storageBucket: "chat-app-bf69e.appspot.com",
    messagingSenderId: "58542027197",
    appId: "1:58542027197:web:dbec03fb4626bd30eda2d4"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async ( email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  storage,
  logInWithEmailAndPassword,
  sendPasswordReset,
};