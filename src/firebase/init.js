import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './configFirebase.js';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  auth, app, db, provider, storage
};
