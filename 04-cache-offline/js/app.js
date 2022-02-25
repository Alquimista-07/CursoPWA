
// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

//-----------------------------------------
// Cache Storage
//-----------------------------------------
// Lo que es el cache storage es parte del objeto window como tal, no es del navegador web como el service worker.

// Nota: Hay que tener en cuenta que hay navegadores que no tienen el cache storage, pero para validar podemos ir a: https://caniuse.com/?search=cache
// Entonces por lo tanto lo que se debe hacer es colocar una clausula para validar si podemos usar el cache storage.
// Normalmente si el navegador soporta el SW eso quiere decir que también soporta cache
if(window.caches){

    // Acá lo que vamos hacemos con esta instrucción es decirle que vaya al cahce, que es un espacio del navegador web un espacio del disco duro
    // e intenta abrir algo, en este caso el espacio llamado prueba-1 y si no existe crealo
    caches.open('prueba-1');
    caches.open('prueba-2');

    //Nosotros podemos comprobar si un cache existe de la siguiente forma:
    caches.has('prueba-2').then(existe => console.log('Cache Existe!!!...: ', existe));

    // Eventualmente vamos a tener que borrar el cache ya que esto va a consumir
    // recursos en el dispositivo del usuario causando una posible afectación al rendimiento de este.
    // Por lo tanto para borrarlo tenemos que hacer lo siguiente:
    caches.delete('prueba-1').then(console.log('Cache borrado!!!...'));

    caches.open('cache-v1.1').then(cache => {

        // Acá quiero que lea el index.html y lo almacene
        cache.add('/index.html');

        // Esiste una opción que nos permite agregar todo lo que nosotros queremos en un arreglo
        // para ello hacemos lo siguiente:
        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'
        ]).then( () => {

            // Como el delete se ejecuta más rapido que la grabación tenemos que encapsular dentro de una promesa

            // Ahora para borrar algo en específico del cache hacemos lo siguiente:
            cache.delete('/css/style.css');

            // Ahora quiero hacer algo más a parte de borrar el stylecss después de cargar el index.html
            // Entonces lo que quiero hacer es una vez que ya sepa que existe el index.html lo que vamos a hacer es reemplazarlo por otra cosa
            cache.put('/index.html', new Response('Hola Mundo!!!...'));

        });

        //Ahora trabajando dentro del cache como puedo leer un archivo que se encuentra dentro del cache
        //Entonces para el ejemplo lo que vamos a hacer es leer el index.html e imprimir el resultado en consola
        cache.match('/index.html')
                .then(res => {

                    res.text().then(console.log);

                });

    });

    // Ahora ¿cómo puedo obtener todos los caches?, para responder esta pregunta hacemos lo siguiente:
    // NOTA:Acá nos devolvería los caches como un arreglo
    caches.keys().then(keys => {
        console.log(keys);
    });

}