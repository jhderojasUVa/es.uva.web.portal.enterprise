'use strict';

self.addEventListener('install', function(event) {
    console.log("INSTALL");
    /*
    // pre cache a load of stuff:
    event.waitUntil(
        caches.open('comunicacion-static').then(function(cache) {
            return cache.addAll([
                '/comunicacion/',
				'/comunicacion/index.html',
                '/comunicacion/historico.html',
                '/comunicacion/ws/menu.json',
                '/comunicacion/ws/noticias.json',
				'/comunicacion/ws/noticiashistorico.json',
                '/comunicacion/ws/theconversation.json',
                '/comunicacion/ws/dicyt.json',
				'/comunicacion/sw.js',
				'/comunicacion/worker.js',
				'/comunicacion/resources/comunicacion/js/webcomponents-loader.js',
				'/comunicacion/resources/comunicacion/js/polyfill.min.js',
                '/comunicacion/js/storage.js',
                '/comunicacion/build/comunicacion.bundle.js',
				'/comunicacion/resources/comunicacion/css/bootstrap.min.css',
				'/comunicacion/resources/comunicacion/css/all.css'
                //'/styles/all.css',
                //'/styles/imgs/bg.png',
                //'/scripts/all.js'
            ]);
        })
    )
    */
});
  
self.addEventListener('activate', function(event) {
// the old version is gone now, do what you couldn't
// do while it was still around
console.log("ACTIVATE");
/*
event.waitUntil(
    schemaMigrationAndCleanup()
)
*/
});

self.addEventListener('sync', function(event) {
    console.log("SYNC EVENT");
    console.log(event);
    if (event.tag == 'uvaSync') {
        console.log("SYNC");
       // event.waitUntil(doSomeStuff());
    }
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
        .catch(function(error) {
            console.error('fetch Error', error);
        })
    );

});
