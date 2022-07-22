import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAjCDf6BmUNofWEN85N4mWdXVDgbYIa6Bw',
  authDomain: 'brainstormingapp-87dbe.firebaseapp.com',
  projectId: 'brainstormingapp-87dbe',
  storageBucket: 'brainstormingapp-87dbe.appspot.com',
  messagingSenderId: '270398829516',
  appId: '1:270398829516:web:00d265b862f4cc9bf26369',
  measurementId: 'G-2S1G2DC4B5',
};

export const app = initializeApp(config);
export const db = getFirestore(app);
