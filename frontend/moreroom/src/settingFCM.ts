import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';

export const firebaseConfig = {
  apiKey: 'AIzaSyA-a86dRyse6BqK0bSCJms1zHWMveTL00Q',
  authDomain: 'd206-moreroom.firebaseapp.com',
  projectId: 'd206-moreroom',
  storageBucket: 'd206-moreroom.appspot.com',
  messagingSenderId: '597145227148',
  appId: '1:597145227148:web:0aac9f33083306a99450a9',
  measurementId: 'G-V13PRRRWKN',
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);
