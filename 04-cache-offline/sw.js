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
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTALBE_NAME = 'inmutable-v1';

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

    // 2- Cache with network fallback:
    // En otras palabras esta estrategia esta indicando que intente primero leer el cache y después si no encuentras el archivo
    // en el cache ve a internet
    
    // Por lo tanto lo primero que tenemos que hacer es verificar si el archivo existe en el cache
    const respuesta = caches.match(event.request)
        .then(res => {

            if(res) return res;

            // No existe el archivo
            // tengo que ir a la web
            console.log('No Existe!!!...', event.request.url);
            
            return fetch(event.request).then(newResp => {
                    
                // Grabamos el archivo nuevo en el cache nuevamente
                // Comentamos lo siguiente y agregamos optimización de código
                /*
                caches.open(CACHE_NAME)
                */
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(event.request, newResp);
                    });
                
                return newResp.clone();
            });

        });

    event.respondWith(respuesta);

});