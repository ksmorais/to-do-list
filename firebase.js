// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Para autenticação
import { getFirestore } from "firebase/firestore";  // Para o Firestore (banco de dados)
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDPcwUy7kueoeXJ4DV4mWb8ztFY91H6Ps",
  authDomain: "to-do-list-5336f.firebaseapp.com",
  databaseURL: "https://to-do-list-5336f-default-rtdb.firebaseio.com",
  projectId: "to-do-list-5336f",
  storageBucket: "to-do-list-5336f.firebasestorage.app",
  messagingSenderId: "606660190964",
  appId: "1:606660190964:web:181ec5e5dc4191ca8974a1",
  measurementId: "G-VBQZ1NN020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };