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

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        // 이미 열려있는 창이 있는지 확인
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // 앱이 열려있지 않은 경우, 새 창 열기
        if (clients && clients.openWindow) {
          // clients 객체 확인
          return clients.openWindow('https://j11d206.p.ssafy.io');
        } else {
          console.log('clients 객체를 찾을 수 없습니다.');
          return Promise.reject('clients.openWindow가 지원되지 않음');
        }
      }),
  );
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

self.addEventListener('push', function (e) {
  if (e.data) {
    const data = e.data.json();
    console.log(data);
    e.waitUntil(
      self.registration.showNotification(data.notification.title, {
        body: data.notification.body,
        icon: '/profiles/profile1.png',
        image: '/profiles/profile1.png',
      }),
    );
  }
});
