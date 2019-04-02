'use strict';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

if (workbox) {
  console.log('Yay! Workbox is loaded \uD83C\uDF89');
} else {
  console.log('Boo! Workbox didn\'t load \uD83D\uDE2C');
}

workbox.core.setCacheNameDetails({ prefix: "ICAS" });

workbox.routing.registerRoute(
// Cache CSS files.
/\.css$/,
// Use cache but update in the background.
new workbox.strategies.StaleWhileRevalidate({
  // Use a custom cache name.
  cacheName: 'css-cache'
}));
//# sourceMappingURL=sw.js.map
