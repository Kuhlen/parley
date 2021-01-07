let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BEGzcELa0fZEP2XS5nS2vQiXvi_hW3nNFtE2ZhrsJetXJE9uLzN0fMm0c_sAYV5CezySmXZLA4Q5zSmCkphpMFc",
    "privateKey": "EzBcacrDHvnZrWVeKDZ-2ppa1Tg8bpJgrDoZ5J8cA2o"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/duEuaqX0EGw:APA91bEPcIqKKm5aMKNGU7qXET0w1sjStSrub-oRE_3BOfwhUXBdPUm8orpRg26zk-lj5LUAg82tDfirGlbYNadIWFvaICujbXh9uwsyta-TTo09SARcgj7-FcTM6XBCLMNvxmPXBMhB",
    "keys": {
        "p256dh": "BHBO+uw1NJ2ALAJA1MqibRMxyqfGrBI6h9A8plQX0OWMvVdkp/gSRwszXLZZuQXRoP6KF1IiGPr5BkDQHLZBlDA=",
        "auth": "PVqC0xQaJUXuSHZgNAIs+w=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '444455463908',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);