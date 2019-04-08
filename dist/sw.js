// importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

// workbox.setConfig({ debug: true });
// workbox.core.setCacheNameDetails({prefix: "ICAS-Statics"});

// with callback example
//
// const excludeImages = ({url, event}) => {
//   var imgRgx = /.*(?:jpg|jpeg|png|gif|svg)$/
//   var siteRgx = /^https:\/\/toolbox\.energyinst\.org.*$/
//   if (url.href.match(siteRgx)) {
//     if (url.pathname.match(imgRgx)) {
//       return false;
//     } return true;
//   } return false;
// };
//
// workbox.routing.registerRoute(
//     excludeImages,
//     workbox.strategies.networkFirst({
//       cacheName: 'toolbox-pages',
//     })
// );

// workbox.routing.registerRoute(
//     new RegExp('^https:\\/\\/app\\.icas\\.com\\/.(.(?!\\.js$|json$|css$|png$|gif$|jpg$|jpeg$|svg$|ico$))+$'),
//     new workbox.strategies.NetworkFirst({
//       cacheName: 'ICAS-Dynamics',
//     })
// );
//
//
// workbox.precaching.precacheAndRoute([
//   {
//     "url": "/__data/assets/git_bridge/0005/450572/dist/js/global.js",
//     "revision": "%globals_asset_assetid:450572^as_asset:asset_updated^prepend:global^base64encode%"
//   },
//   {
//     "url": "/__data/assets/git_bridge/0005/450572/dist/js/plugins.min.js",
//     "revision": "%globals_asset_assetid:450572^as_asset:asset_updated^prepend:plugins^base64encode%"
//   },
//   {
//     "url": "/__data/assets/git_bridge/0005/450572/dist/js/vendor/jquery.min.js",
//     "revision": "%globals_asset_assetid:450572^as_asset:asset_updated^prepend:jquery^base64encode%"
//   },
//   {
//     "url": "/__data/assets/git_bridge/0005/450572/dist/styles/main.css",
//     "revision": "%globals_asset_assetid:450572^as_asset:asset_updated^prepend:main^base64encode%"
//   },
//   {
//     "url": "/manifest.json",
//     "revision": "%globals_asset_assetid:450699^as_asset:asset_updated^prepend:manifest^base64encode%"
//   }
//
// ]);

//note
// assets under precacheAndRoute are precached and can be accessed with a fallback. for example:
//
//EXAMPLE START
//
//this is the handler
// const articleHandler = workbox.strategies.networkFirst({
//   cacheName: 'articles-cache',
//   plugins: [
//     new workbox.expiration.Plugin({
//       maxEntries: 50,
//     })
//   ]
// });
//
//
//this is the router: in this case we uase the previously create handler to manage the response.
//if the asset cannot be accessed, the pages offline or 404 (previously added to precacheAndRoute)
//will be accessed.
// workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
//   return articleHandler.handle(args).then(response => {
//     if (!response) {
//       return caches.match('pages/offline.html');
//     } else if (response.status === 404) {
//       return caches.match('pages/404.html');
//     }
//     return response;
//   });
// });
//
// EXAMPLE END


//I can also try to load some pages that have non yet been seen
//google example code at https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache
//
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//       fetch(event.request).catch(function() {
//         return caches.match(event.request);
//       })
//   );
// });
//
//
// or even better this: investigate please
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-then-network
"use strict";
//# sourceMappingURL=sw.js.map
