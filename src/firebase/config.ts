import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore pointing to the provisioned database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const FIREBASE_STORAGE_BUCKET = firebaseConfig.storageBucket;
export const OWNER_EMAIL = 'physicaltospiritual@gmail.com';
