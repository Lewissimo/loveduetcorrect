import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAPZ6VqKCo_YChK7RyWSgYJupsWG3A7aEo',
  authDomain: 'loveduet-df5a9.firebaseapp.com',
  projectId: 'loveduet-df5a9',
  storageBucket: 'loveduet-df5a9.appspot.com',
  messagingSenderId: '1095878568044',
  appId: '1:1095878568044:web:3e171c3528ac8d614b5049',
  measurementId: 'G-7XQ9HNWHG2',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
