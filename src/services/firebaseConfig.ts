import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Conditional import (commented out for now)
// import { getReactNativePersistence } from 'firebase/auth/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB0h4ucuFzts3J78eNcgVIUCR070USFvFU',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'onecook1-772a5',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: '1:683802416894:android:5e8e6e5dc9d4750e45b7af',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Toggle this flag when you're ready to switch!
const usePersistentAuth = false;

// Choose persistence dynamically
const persistence = usePersistentAuth
  // ? getReactNativePersistence(AsyncStorage) // ← Use this after ejecting
  ? browserLocalPersistence // ← Just a placeholder for web, if testing
  : inMemoryPersistence;

const auth = initializeAuth(app, { persistence });
const db = getFirestore(app);

export { auth, db };
