//console.log('SW: Hola Mundo!!!...');

// No es normal escribir codigo JavaScript dentro de este archivo, es decir, que no se pueda hacer
// pero normalmente el Service Worker (SW) va a contener acciones a sucesos que sucedan en la página o en nuestra aplicación

//Usamos la palabra self para hacer referencia al SW
self.addEventListener('fetch', evento => {

    //console.log(evento);

    //Acá por ejemplo lo que vamos a hacer e bloquear a través del SW la petición al archivo style.css
    if(evento.request.url.includes('style.css')){
        evento.respondWith(null);
    }
    else{
        evento.respondWith(fetch(evento.request));
    }

});