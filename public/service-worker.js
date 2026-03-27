const CACHE_NAME = "notes-app-v1";

const urlsToCache = [
  "/",
  "/offline.html",
];

// INSTALL → cache app shell
self.addEventListener("install", (event) => {
  console.log("SW Installed");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting();
});

// ACTIVATE → clean old cache
self.addEventListener("activate", (event) => {
  console.log("SW Activated");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// FETCH → serve from cache if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((res) => {
        return res || caches.match("/offline.html");
      });
    })
  );
});