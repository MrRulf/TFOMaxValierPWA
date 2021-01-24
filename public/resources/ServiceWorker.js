self.addEventListener("install", async e => {

    const cache = await caches.open("static");
    cache.addAll([
        "/",
        "/manifest.json",
        "/images/logo.png",
        "/images/splashscreen.png",
        "/images/maskable_logo.png"
    ]);

});

self.addEventListener("fetch", async e => {

    var url = new URL(e.request.url);

    if(url.origin == location.origin){

        //Cache als erstes kontrollieren

        const response = await caches.match(e.request);

        return response || fetch(e.request);

    }else{

        //Vom Internet cachen

        const cache = await caches.open("dynamic");

        try{

            const res = await fetch(req);
            cache.put(req, res.clone());

            return res;

        }catch(err){

            const cachedResponse = await cache.match(req);
            return cachedResponse || 'ERROR!';

        }

    }

});