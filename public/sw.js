// Muhtar service worker — DISABLED TEMPORARILY FOR SUBMISSION
// The previous SW cached files that no longer exist (logo-white.png) causing errors
// To re-enable after submission: bump CACHE_VERSION and re-add
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});
// Pass-through: do NOT intercept fetch events at all
