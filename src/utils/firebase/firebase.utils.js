import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} 
from 'firebase/auth';

import {
    getFirestore,
    doc, //access doc
    getDoc, //access data from doc
    setDoc //set data
}
from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBwjExhVXN2agG9DsgCxaQN58htOoZCHYo",
    authDomain: "capstone-db-46e20.firebaseapp.com",
    projectId: "capstone-db-46e20",
    storageBucket: "capstone-db-46e20.appspot.com",
    messagingSenderId: "771034698587",
    appId: "1:771034698587:web:10f921372e3bac9df3007e"
  };

  // Initialize Firebase  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid); //userAuth is the user object created when someone signs in

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth; //pull those attributes from userAuth object
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
     
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};