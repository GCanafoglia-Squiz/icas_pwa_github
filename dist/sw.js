'use strict';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

workbox.core.setCacheNameDetails({ prefix: "ICAS" });

workbox.routing.registerRoute(
// Cache CSS and js files.
/\.(?:js|css)$/, new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-js-cache'
}));

workbox.routing.registerRoute(
//Icons Cache
new RegExp(/^https:\/\/app\.icas\.com\/_resources\/icons\/.*\.(?:png)$/), workbox.strategies.staleWhileRevalidate({
    cacheName: 'icons-cache'
}));
//# sourceMappingURL=sw.js.map
