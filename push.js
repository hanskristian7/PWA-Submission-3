var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJ_fSZ-qRkE-SzFWZ_ZPSC1dzFsSxF4v7R15JWuMmswHxkhtJGG30_WRtkqaTiPmUUfhDlV6xdDtP4LN5t8YqV4",
   "privateKey": "8-73jwocpC1rwHCCFaBr7elQvUXZelcuJQwnl3GCet8"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eAPtwjIu60Y:APA91bEnD9oSsK_4FMjjEjaOvOGS4xelDf9k2PPPhF6_1FpdMZVhzteW_QgF0DXCt2um7j-dTMp98B0ct8Nm2gjo-24shj2Jfcx4U7TQzqwDQVpoJ9GuLc_JEWeBQpp7YO01id7XnQxF",
   "keys": {
       "p256dh": "BNGCFAW48iUvk/I1TX/piqmtJmI43ciiE9Lnr4R013zy1ziqcHjflv2WnHNuqZFaJtoX6a5lq6tZ7veScOrn5jI=",
       "auth": "KvTTKNAlTZkGeCeDvlvyDQ=="
   }
};
var payload = 'Berikut info-info mengenai liga Spanyol';
 
var options = {
   gcmAPIKey: '927499394432',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);