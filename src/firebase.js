import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {functions} from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDU1Ct4QRkC0CGmbYoFsQV9XADSpC3MuUc",
    authDomain: "t4sg-demo.firebaseapp.com",
    projectId: "t4sg-demo",
    storageBucket: "t4sg-demo.appspot.com",
    messagingSenderId: "567284507618",
    appId: "1:567284507618:web:78ae2385ea4a9302a30fbb"
  }

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

export const generateUserDocument = async (user, additionalData, fax) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    console.log(additionalData)
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName } = user;
        
        try {
          console.log('got here')
          await userRef.set({
            displayName : displayName,
            email: email,
            // firstName: firstName, 
            // lastName: lastName,
          });
        } catch (error) {
          console.error("Error creating user document", error);
        }
      }
      return getUserDocument(user.uid);
}


const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (err) {
      console.log(err);
    }
  }