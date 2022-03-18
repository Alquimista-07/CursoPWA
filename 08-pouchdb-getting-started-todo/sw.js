// Imports
importScripts('js/sw-utils.js');

// Creamos unas constantes con los tipos de cache que vamos a manejar
const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

// Creamos nuestros arreglos con la información que queremos guardar en el cache static y el inmutable
const APP_SHELL = [
    '/',
    'index.html',
    'style/base.css',
    'js/base.js',
    'js/app.js',
    'js/sw-utils.js',
    'style/bg.png'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js'
];

// Agregamos los elementos a nuestro cache static e inmutable cuando se realice la instalación del SW
self.addEventListener('install', e => {

    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));

    // Espereramos y obligamos a que las promesas se ejecuten
    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ]) );

});

// Creamos un evento para que cada vez que yo cambie el SW me borre los caches anteriores
self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            // Ajustamos para que borre el cache static para corroborar que se actualice
            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            // Ajustamos para que borre el cache dinamico para corroborar que se actualice
            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});

self.addEventListener('fetch', e => {

    const respuesta = caches.match( e.request ).then( res =>{

        if( res ){
            return res;
        }
        else{
            
            // Implementamos la estrategia de dynaic cache (network fallback)
            return fetch( e.request ).then( newRes =>{

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });

    e.respondWith( respuesta );

});