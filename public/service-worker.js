importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1'},
    { url: '/data_teams.html', revision: '1'},
    { url: '/icon-192x192.png', revision: '1'},
    { url: '/icon-512x512.png', revision: '1'},
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1'},
    { url: '/nav.html', revision: '1' },
    { url: '/not_found.png', revision: '1' },
    { url: '/service-worker.js', revision: '1' },
    { url: '/css/custom.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/button.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/jquery-3.5.1.min.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/sworkers.js', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/pages/tables.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url: '/src/BBR.png', revision: '1' },
    { url: '/src/BOL.png', revision: '1' },
    { url: '/src/BRE.png', revision: '1' },
    { url: '/src/BRI.png', revision: '1' },
    { url: '/src/CHA.png', revision: '1' },
    { url: '/src/font.woff2', revision: '1' },
    { url: '/src/HUL.png', revision: '1' },
    { url: '/src/LEE.png', revision: '1' },
    { url: '/src/LUT.png', revision: '1' },
    { url: '/src/NOT.png', revision: '1' },
    { url: '/src/PNE.png', revision: '1' },
    { url: '/src/REA.png', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
        } else {
            body = 'Push message no payload';
        }
    var options = {
        body: body,
        icon: '/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});