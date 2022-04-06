// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  query,
  updateDoc,
  where
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"


const firebaseConfig = {
  apiKey: "AIzaSyDx0GkGrWFzw93EiPiDskqbDwpplKUHdq4",
  authDomain: "firetask-c4861.firebaseapp.com",
  projectId: "firetask-c4861",
  storageBucket: "firetask-c4861.appspot.com",
  messagingSenderId: "891304328101",
  appId: "1:891304328101:web:cdd56b3129fba8ab8bc64c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description, uid) => addDoc(collection(db, 'tasks'), {title, description, uid})

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (uid, callback) => onSnapshot(query(collection(db, 'tasks'), where("uid", "==", uid)), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))

export const getTask = (id) =>  getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields)


export const signIn = async () => {

  const provider = new GoogleAuthProvider()
  await signInWithPopup(getAuth(), provider)
}

export const signOutUser = () => {
  // Sign out of Firebase.
  signOut(getAuth());
  console.log('se cerro sesion')
}

export const getImageProfile = () => {
  return getAuth().currentUser.photoURL || console.log('no hay foto')
}

export const observerCount = (user) => {
  onAuthStateChanged(getAuth(), user)}

export const getNameProfile = () => {
  return getAuth().currentUser.displayName || console.log('no hay nombre')
}

export const getUidProfile = () => {
  return getAuth().currentUser.uid || console.log('no hay uid')
}