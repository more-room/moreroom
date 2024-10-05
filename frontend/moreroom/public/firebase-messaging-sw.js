importScripts(
  'https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js',
);

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('FCM sw activate..');
});

const firebaseConfig = {
  apiKey: 'AIzaSyA-a86dRyse6BqK0bSCJms1zHWMveTL00Q',
  authDomain: 'd206-moreroom.firebaseapp.com',
  projectId: 'd206-moreroom',
  storageBucket: 'd206-moreroom.appspot.com',
  messagingSenderId: '597145227148',
  appId: '1:597145227148:web:0aac9f33083306a99450a9',
  measurementId: 'G-V13PRRRWKN',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
