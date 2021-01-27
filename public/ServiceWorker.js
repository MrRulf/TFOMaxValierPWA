
const FILES_TO_CACHE = [
    "/manifest.json",
    "/offline",
    "/resources/css/nav_style.css",
    "/resources/css/offline_page.css",
    "/assets/images/logo.png",
    "/assets/images/splashscreen.png",
    "/assets/images/maskable_logo.png",
    "https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap"
];

const STATIC_CACHE_NAME = "static";

self.addEventListener("install",  e => {

    e.waitUntil(
        
        caches.open(STATIC_CACHE_NAME).then(cache => {

            console.log("Caching files");

            cache.addAll(FILES_TO_CACHE);

        })

    );

});

self.addEventListener('activate', e => {

    e.waitUntil(

      caches.keys().then(keys => {

        return Promise.all(keys
          .filter(key => key !== STATIC_CACHE_NAME)
          .map(key => caches.delete(key))
        );

      })

    );
    
  });

self.addEventListener("fetch", e => {

    e.respondWith(

        caches.match(e.request).then(cache => {

          return cache || fetch(e.request).then(response => {

              return response;

          });

        }).catch(() => caches.match('offline'))

      );

});