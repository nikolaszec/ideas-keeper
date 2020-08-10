import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAACcSEA1NF6VaH0TWbyLvfpsuyYwgV0bM',
  authDomain: 'ideas-keeper.firebaseapp.com',
  databaseURL: 'https://ideas-keeper.firebaseio.com',
  projectId: 'ideas-keeper',
  storageBucket: 'ideas-keeper.appspot.com',
  messagingSenderId: '939947631990',
  appId: '1:939947631990:web:b8c5dcd0a7010a0e96c657',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Setting up google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = userAuth;
    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
        ...additionalData,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  }
  return userRef;
};

export default firebase;
