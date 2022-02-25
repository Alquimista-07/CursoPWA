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

self.addEventListener('install', event => {

    const cacheProm = caches.open('cache-1')
        .then(cache => {
            
            return cache.addAll([
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/js/app.js'
            ]);

        });

        event.waitUntil(cacheProm);

});