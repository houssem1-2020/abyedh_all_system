importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDZMrqfYqMXiJIX4_S-20YHBbjjqgtdJhM",
    authDomain: "abyedh-com.firebaseapp.com",
    projectId: "abyedh-com",
    storageBucket: "abyedh-com.appspot.com",
    messagingSenderId: "622105310544",
    appId: "1:622105310544:web:bb5010f23dd608eb8ca855",
    measurementId: "G-HGJT68ZN4P"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
