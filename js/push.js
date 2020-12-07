var webPush = require('web-push');
// "publicKey":"BFVV2y9-bYcVG6vQi-Y3vp3c6uByFmnH7Dp6DJY1tSUpS64gOXR6pwOFdEoHVf24Uul8bf69QMkFdDpzk3cKNqU"
// "privateKey":"MvmuE24ryBea-4Gh7Y99Zrovpn2NEEzp3d5Io_bx0kY"

const vapidKeys = {
   "publicKey": "BFVV2y9-bYcVG6vQi-Y3vp3c6uByFmnH7Dp6DJY1tSUpS64gOXR6pwOFdEoHVf24Uul8bf69QMkFdDpzk3cKNqU",
   "privateKey": "MvmuE24ryBea-4Gh7Y99Zrovpn2NEEzp3d5Io_bx0kY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dZ0vMkyUb3c:APA91bFsSC6r2ee5b5L2wOYO-yKZR3DEeA3O1Mc9NqfkpJEffPsWsul8hCpqrA3ad-ZNGdKc1hMQ9CyHiZKCSDv6mOTX1O3wdbaPLY_Wb2OX_q1gp1zp-9njW45bZROxYEPEEuOzMBez",
   "keys": {
       "p256dh": "BDdkaQFEUoM0Fj/hDMDGFmDnztrYHjDOBPepWOMfh/QiloanW5UuyWD52RyGXKbibYm9LiJUTLvrDw3ZsbD6Zgg=",
       "auth": "DESsDptztZ+Wgq0B5CEElg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '134495586219',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);