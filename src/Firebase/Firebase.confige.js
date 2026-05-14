
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDth0eOT0YFz-sHn0Uqw0bf3L8w3_e7KBE",
  authDomain: "localchefbazaar-78844.firebaseapp.com",
  projectId: "localchefbazaar-78844",
  storageBucket: "localchefbazaar-78844.firebasestorage.app",
  messagingSenderId: "509590001999",
  appId: "1:509590001999:web:c1e250c288c878aaed4d3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
