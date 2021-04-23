// Incrementing OFFLINE_VERSION will kick off the install event and force previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = "museoffline";
const OFFLINE_URL = "offline.html";
/*------------------------------------------------------------*/
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));//Request and cache fresh offline message file
    })()
  );
  self.skipWaiting();// Force the waiting service worker to become the active service worker.
});
/*------------------------------------------------------------*/
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported. See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
  self.clients.claim();// Active service worker should take control of the page immediately
});
/*------------------------------------------------------------*/
self.addEventListener("fetch", (event) => {
  // Call event.respondWith() if this is a navigation request for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try{
          const preloadResponse = await event.preloadResponse;// Try to use the navigation preload response if it's supported.
          if(preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);//Let's request the file...
          return networkResponse;
        } catch (error) {
          // In case of a network error
          console.log("Unable to reach Muse servers", error);
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});