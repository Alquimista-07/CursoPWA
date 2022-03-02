//---------------------------------------------------
// NOTA:
//---------------------------------------------------
// En esta parte del curso vamos a guardar el APP SHELL en el cache storage. Pero ¿Qué es el APP SHELL?. 

// El APP SHELL puede variar dependiendo de la aplicación pero en nuestro caso, entiendase por APP SHELL
// que es lo que la aplicación necesita a fuerza para que funcione, en este caso, diriamos que es todo el código, lo que es el bootstap, estilos, imagenes, JavaScript, etc.
// Pero no todo formaria parte del APP SHELL, por ejemplo la imágen main-patas-arriba no lo estoy usando o todavía no la necesito por lo tanto no formaria parte del APP SHELL,
// otra cosa que no sería parte de la APPSHELL podría ser una petición AJAX hacia un lugar de un sitio web.

// Por lo tanto APP SHELL es todo lo que nuestra aplicación ncesita para que funcione y es algo que nosotros queremos cargar rápidamente por lo tanto eso lo vamos a colocar en el cache
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Creamos una constante para optimizar y almacenar el nombre del cache
// Comentamos la siguiente linea que ya no nos va a servir ya que vamos a optimizar el código
/*
const CACHE_NAME = 'cache-1';
*/
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTALBE_NAME = 'inmutable-v1';

// Constante para optimizar el valor de limite del cache dinamico
const CACHE_DYNAMIC_LIMIT = 50;

// Función para limpiar y limitar el cache
// Nosotros podemos eliegir cual cache limpiar y usualmanete el cache que se limpia es el dynamic
// Pero para el caso del curso se va a hacer que funcione para que limpie cualquier cache.
// Para la siguiente fucnión especificaremos por parametro el nombre del cache, el número de elementos que quiero mantener en el cache el cual puede ser estático o dinámico
function limpiarCache(cacheName, numeroItems){

    caches.open(cacheName)
        .then(cache => {

            // Ahora necesito barrer todos los elementos que contenga ese cache
            cache.keys()
                .then(keys => {
                    console.log(keys);

                    if(keys.length > numeroItems){
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }

                });

        });

}

self.addEventListener('install', event => {

    /*
    const cacheProm = caches.open(CACHE_NAME)
    */
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                //'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/js/app.js'
            ]);

        });
        
        // Agregamos el contenido inmutable al nuevo cache para el tema de la optimización del código
        const cacheInmutable = caches.open(CACHE_INMUTALBE_NAME)
            .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
        
        event.waitUntil(Promise.all([cacheProm, cacheInmutable]));

});

//--------------------------------------------------------------
// Estrategias del cache
//--------------------------------------------------------------
self.addEventListener('fetch', event =>{

    //-----------------------------------------------------------------------------------------------------
    // Comentamos toda la estrategia 1 para la explicación de la estrategia 2 cache with network fallback
    //-----------------------------------------------------------------------------------------------------
    // 1- Cache Only: 
    // Esta es usada cuando queremos que la aplicación solo sea servida desde el cache
    // y no va a haber petición que acceda a la web
    // NOTA: En este caso nos va a fallar y es un error algo complicado ya que nos falta almacenar el / en el cache
    // para ello lo vamos a almacenar en el cache modificando en el event listener install, 
    
    // NOTA: Adicionalmente hay que aclara que esta estrategia tiene un problema y es que si nosotros jamás
    // actualizamos el SW, este jamás va a ir a la web y no obtendríasmos actualizaciones, por lo tanto si el usuario quiere
    // acceder a un recurso que no este en el cache la aplicación va a fallar.
    // Para la explicación de la segunda estrategia de cache comentamos la siguiente línea para que no entre en conflicto
    /*
    event.respondWith(caches.match(event.request));
    */

    //-----------------------------------------------------------------------------------------------------
    // Comentamos toda la estrategia 2 para la explicación de la estrategia 3 network with cache fallback
    //-----------------------------------------------------------------------------------------------------
    // 2- Cache with network fallback:
    // En otras palabras esta estrategia esta indicando que intente primero leer el cache y después si no encuentras el archivo
    // en el cache ve a internet
    
    // Por lo tanto lo primero que tenemos que hacer es verificar si el archivo existe en el cache
    // const respuesta = caches.match(event.request)
    //     .then(res => {

    //         if(res) return res;

    //         // No existe el archivo
    //         // tengo que ir a la web
    //         console.log('No Existe!!!...', event.request.url);
            
    //         return fetch(event.request).then(newResp => {
                    
    //             // Grabamos el archivo nuevo en el cache nuevamente
    //             // Comentamos lo siguiente y agregamos optimización de código
    //             /*
    //             caches.open(CACHE_NAME)
    //             */
    //             caches.open(CACHE_DYNAMIC_NAME)
    //                 .then(cache => {
    //                     cache.put(event.request, newResp);
    //                     // Llamamos funcion limpiar cache luego de grabar 
    //                     limpiarCache(CACHE_DYNAMIC_NAME, 50);
    //                 });
                
    //             return newResp.clone();
    //         });

    //     });

    // event.respondWith(respuesta);


    //-----------------------------------------------------------------------------------------------------
    // Comentamos toda la estrategia 3 para la explicación de la estrategia 4 cache with network update
    //-----------------------------------------------------------------------------------------------------
    // 3- Estretegia: Network with cache fallback
    // Básicamente lo que hace esta estrategia de cache es que primero vaya a internet, intente obtener el recurso
    // y si lo tiene muestralo, si no lo tiene intenta ver si existe en el cache

    //--------------------------------------------------------------------------------------------------------------------------------
    //NOTA: Hay unos inconvenientes con la estrategia 3 sobre todo cuando estamos en un dispositivo móvile porque:
    // 1. Siempre hace un fetch, es decir, que siempre hay un consumo de datos y no todos tenemos plan ilimitado de datos en nuestros
    //    dispositivos móviles
    // 2. Esta estrategia es mucho más lenta que la estrategia 2 de cache first, porque si estamos en una red limitada, en redes 2G,
    //    o un internet muy lento, es posible que en esta estrategia puede que el fetch lo haga pero pasen segundos antes de obtener 
    //    una respuesta de que lo obtuvo o una respuesta de error
    //--------------------------------------------------------------------------------------------------------------------------------
    // const respuestaNetwork = fetch(event.request).then(res => {

    //     console.log('Fetch', res);

    //     // Ahora algo que podemos hacer como una clausula de seguridad es que si la respuesta no existe intente leela del cache
    //     if(!res) return caches.match(event.request);

    //     caches.open(CACHE_DYNAMIC_NAME)
    //         .then(cache => {
    //             cache.put(event.request, res);
    //             limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //         });

    //     return res.clone();
        
    // }).catch(err => {
    //     // Capturamos el error en caso de que no vaya a internet y validamos si existe algo en el cache que haga match
    //     // con la petición que me están dando y eso es lo que nos tiene que regresar
    //     return caches.match(event.request);
    // });

    
    // event.respondWith(respuestaNetwork);


    // 4- Estretegia: Cache with network update
    // Esta estrategía es muy útil cuando el rendimiento es crítico, es decir, necesitamos que la información se muestre
    // lo más rapido posible en nuestra aplicación para que el ususrio sienta que esta trabajando en una aplicación nativa
    // pero también nos interesan las actualizaciones o las actualizaciones son importantes, pero ene este caso nuestras 
    // actualizaciones siempre estarán un paso atrás, es decir, una versión atrás de la versión actual de nuestra aplicación

    // Agregamos una clausula para que me agregue el bootstrap ya que no estamos llamando al cache inmutable en ningún momento
    // y por lo tanto no lo muestra
    if(event.request.url.includes('bootstrap')){
        return event.respondWith(caches.match(event.request));
    }

    const respuestaNetworkUpdate = caches.open(CACHE_STATIC_NAME).then(cache => {

        fetch(event.request).then(newResp => 
            cache.put(event.request, newResp));

        return cache.match(event.request);

    });

    event.respondWith(respuestaNetworkUpdate);



});