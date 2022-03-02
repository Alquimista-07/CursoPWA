// En este service worker vamos a implementar la segunda estrategia de cache
// que vimos en pasos anteriores

// Hacemos las configuraciones necesarias para la instalación y creación de nuestros cache
// tal cual como lo vimos anteriormente
const CACHE_STATIC_NAME  = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;


function limpiarCache( cacheName, numeroItems ) {


    caches.open( cacheName )
        .then( cache => {

            return cache.keys()
                .then( keys => {
                    
                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });

            
        });
}




self.addEventListener('install', e => {


    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
                '/img/no-img.jpg',
                '/pages/offline.html'
            ]);

        
        });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
            .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));


    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

});


// Ahora acá vamos a implimentar la estrategia dos del cache que vimos en las explicaciones del curso
self.addEventListener('fetch', e => {

    // 2- Cache with Network Fallback
    const respuesta = caches.match( e.request )
        .then( res => {

            if ( res ) return res;

            // No existe el archivo y tengo que ir a la web
            console.log('No existe', e.request.url );

            return fetch( e.request ).then( newResp => {

                caches.open( CACHE_DYNAMIC_NAME )
                    .then( cache => {
                        cache.put( e.request, newResp );
                        limpiarCache( CACHE_DYNAMIC_NAME, 50 );
                    });

                return newResp.clone();
                
            }).catch( err => {

                // Validamos para que mande la pagina de error personalizada siempre y cuando
                // se solicite una página web, ya que si lo que no existiera fuera por ejemplo una imágen o un archivo css
                // no mostraria el error y pues eso no sería lo correcto
                // NOTA: La siguiene validación también se puede usar para validar si lo que se solicitan son imágenes, css y
                //       cualquier cosa en particular
                if( e.request.headers.get('accept').includes('text/html') ){
                    return caches.match('/pages/offline.html');
                }

            });


        });


    e.respondWith( respuesta );

});