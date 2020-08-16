importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

let revision_number = 1;
workbox.precaching.precacheAndRoute([
    { url: '/', revision: revision_number },
    { url: '/manifest.json', revision: revision_number },
    { url: '/nav.html', revision: revision_number },
    { url: '/index.html', revision: revision_number },
    { url: '/detail_tim.html', revision: revision_number },
    { url: '/pages/home.html', revision: revision_number },
    { url: '/pages/list_tim.html', revision: revision_number },
    { url: '/pages/favorites.html', revision: revision_number },
    { url: '/css/materialize.min.css', revision: revision_number },
    { url: '/css/materialize.css', revision: revision_number },
    { url: '/js/materialize.min.js', revision: revision_number },
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    }),
);

workbox.routing.registerRoute(
  new RegExp('/detail_tim.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'detail'
  }),
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js'
  }),
);

// menyimpan image
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEtnries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      })
    ]
  }),
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
)

// Menyimpan base_url API
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'base_url',
  })
)

self.addEventListener('push', function(event) {
  var body;
  let title = "Liga Bola Spanyol"
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/favicon.png',
    badge: 'images/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});