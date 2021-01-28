const FILES_TO_CACHE = [
    "/manifest.json",
    "/offline",
    "/resources/css/base.css",
    "/resources/css/nav_style.css",
    "/resources/css/forms.css",
    "/resources/css/offline_page.css",
    "/assets/images/logo.png",
    "/assets/images/splashscreen.png",
    "/assets/images/maskable_logo.png",
    "https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap",
    "https://code.jquery.com/jquery-3.5.1.min.js"
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
      
      fetch(e.request)
      .then((res) => {

        const url = new URL(e.request.url);       

        //Update cache if files come from local storage
        if(url && url.pathname)
          if(FILES_TO_CACHE.includes(url.pathname))
            caches.open(STATIC_CACHE_NAME).then(function(cache) {
              cache.put(url.pathname, res.clone());
            });

        return res.clone();

      })
      .catch(() => {

        return caches.match(e.request.url, {ignoreVary: true})
          .then(cache => {
                  
            if(cache)
              return cache;
            else
              //Show offline page
              return caches.match('offline', {ignoreVary: true});

          });

      })
      
    );

});