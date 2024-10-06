import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../settingFCM';
import { postDeviceToken } from '../apis/notificationApi';

// service worker 등록
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker 등록 성공: ', registration);
        })
        .catch((error) => {
          console.log('Service Worker 등록 실패: ', error);
        });
    });
  }
};

// 알림 허용
export const handleAllowNotification = async () => {
  registerServiceWorker();

  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey:
          'BBzIVhn6Tz00wjAfqUb0CEPhg_Huuxo5WjbSYYUjE04sPoXyxR7ebGcwy-sULuMsnhMdoc4_phYSzM5-vOFwnL0',
      });

      if (token) {
        console.log('토큰 등록: ', token);
        await postDeviceToken(token);
      } else {
        alert('토큰 등록 실패. 알림 권한 허용 부탁');
      }
    } else if (permission === 'denied') {
      alert('알림 권한 하단. 권한 허용 부탁');
    }
  } catch (error) {
    console.error('토큰 에러', error);
  }
};

// foreground 알림
onMessage(messaging, (payload) => {
  const notificationTitle = payload.notification?.title;
  const notificationOptions: NotificationOptions | undefined = {
    body: payload.notification?.body,
  };

  if (Notification.permission === 'granted') {
    new Notification(notificationTitle!, notificationOptions);
  }
});