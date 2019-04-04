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
//     new RegExp('^https:\\/\\/app\\.icas\\.com\\/.(.(?!\\.js$|json$|css$|png$|gif$|jpg$|jpeg$|svg$))+$'),
//     new workbox.strategies.StaleWhileRevalidate({
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
//   //I can add here the single pages and a list generated from the "saved to record" to cache elements not yet seen.
// ]);
"use strict";
//# sourceMappingURL=sw.js.map
