const CACHE_NAME = "study-focus-timer-v2";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./ambient-calm.mp3",
  "./applause.mp3"
];

/* INSTALL */

self.addEventListener("install", event => {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(
          FILES_TO_CACHE
        );

      })

  );

  self.skipWaiting();

});


/* ACTIVATE */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches
      .keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames.map(name => {

            if (name !== CACHE_NAME) {

              return caches.delete(name);

            }

          })

        );

      })

  );

  self.clients.claim();

});


/* FETCH */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches
      .match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);

      })

  );

});
