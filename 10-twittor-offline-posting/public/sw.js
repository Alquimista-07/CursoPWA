// imports
// Imports necesarios para usar puchdb.
//----------------------------------------------------------------------------------------
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js');
//NOTA: Agretamos el archivo sw-db.js antes del sw-utils.js porque van a haber funciones
//      que van a ser necesarias en el sw-utils.js, si estuviera al revés pueden aparecer
//      errores porque probablemente este haciend referencia a funciones que aún no se
//      encuentren definidas
importScripts('js/sw-db.js');
//----------------------------------------------------------------------------------------
importScripts('js/sw-utils.js');


const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    //'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    // Agregamos PuchDB al inmutable para que se almacene en dicho cache
    'https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js'
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});





self.addEventListener( 'fetch', e => {

    // Hacemos cambios para que ahora se use la estrategia de network with cache fallback
    // para las peticiones a nuestra API
    let respuesta;
    
    if ( e.request.url.includes('/api') ){

        // return respuesta????;
        respuesta = manejoApiMensajes( DYNAMIC_CACHE, e.request );

    }
    else{

        respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                
                actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE );
                return res;
            } else {
    
                return fetch( e.request ).then( newRes => {
    
                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
    
                });
    
            }
    
        });

    }

    e.respondWith( respuesta );

});

// Registramos las tareas asíncronas
self.addEventListener('sync', e => {
    
    console.log('SW: Sync');

    // Pueda ser que tengamos varias acciones asíncronas y queramos darle un tratamiento independiente
    // a cada una, y lo podríamos manejar con un switch pero para este caso como es un solo evento lo manejamos
    // con un if en el cual leemos la tarea registrada mediante el tag con el que se registro la tarea, que para el caso
    // si miramos en nuestro archivo sw-db.js el tag que colocamos fue 'nuevo-post'
    if( e.tag === 'nuevo-post'){
        
        // Postear a DB cuando hay conexión a internet

        // e.waitUntil( ??? );

    }

});