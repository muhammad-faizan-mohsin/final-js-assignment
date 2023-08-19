import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,signOut   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {  deleteDoc,getFirestore, doc, setDoc , getDoc ,collection, addDoc,serverTimestamp, query, where, onSnapshot} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyCHJUZmu92uOhu2UPXTN-aZUa1dgD0QqGE",
    authDomain: "final-project-smit.firebaseapp.com",
    projectId: "final-project-smit",
    storageBucket: "final-project-smit.appspot.com",
    messagingSenderId: "1080139437991",
    appId: "1:1080139437991:web:1e08c74595c71c742d0882"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()
const provider = new GoogleAuthProvider()

export {
    auth, 
    db,
     doc,
      setDoc,
      createUserWithEmailAndPassword,
       signInWithEmailAndPassword, 
       GoogleAuthProvider, 
       signInWithPopup,
       provider,
       signOut ,
       getAuth ,
       getDoc,
       collection,
        addDoc,
        serverTimestamp,
        query, 
        where,
         onSnapshot,
         deleteDoc,
          getStorage,
         ref,
         uploadBytes,
         uploadBytesResumable,
         getDownloadURL,
         deleteObject,
       
}