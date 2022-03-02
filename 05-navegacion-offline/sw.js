// En este service worker vamos a implementar la segunda estrategia de cache
// que vimos en pasos anteriores

// Hacemos las configuraciones necesarias para la instalación y creación de nuestros cache
// tal cual como lo vimos anteriormente
// const CACHE_STATIC_NAME  = 'static-v1';
const CACHE_STATIC_NAME  = 'static-v4';
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

    
    // Obligamos a que las promesas se ejecuten en orden para ratificar que todo se agregue al cache correctamente
    // y no se cause un fallo debido a que por ejemplo el cache inmutable se instalo primero y el cacheprom aún no ha terminado de instalar
    // lo cual puede causar un error porque algún archivo no exista 
    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

});

// Agregamos el evento activate el cual se va ejecutar después de que nuestro SW se instale y el cual va a servir para que limpiar y borrar 
// los caches de versiones viejas los cuales quedan ocupando espacio en el dispositivo y ya no sirven para nada
// NOTA: Ojo este código nos podría sirvir para borrar cualquier cache no solo el static, ya que básicamente lo que se haría es agregar otro bloque de código
//       casi con las mismas instrucciones y cambiar la constante en la validación if por los nombre de los otros cache
self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if( key !== CACHE_STATIC_NAME && key.includes('static') ){
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

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