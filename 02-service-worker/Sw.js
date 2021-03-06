//console.log('SW: Hola Mundo!!!...');

// No es normal escribir codigo JavaScript dentro de este archivo, es decir, que no se pueda hacer
// pero normalmente el Service Worker (SW) va a contener acciones a sucesos que sucedan en la página o en nuestra aplicación

//Usamos la palabra self para hacer referencia al SW
self.addEventListener('fetch', evento => {

    //console.log(evento);

    //Acá por ejemplo lo que vamos a hacer e bloquear a través del SW la petición al archivo style.css
    /*
    if(evento.request.url.includes('style.css')){
        //La siguiente instrucción de codigo va a causar que la petición responda null
        //y por lo tanto no va a ser llevada a cabo
        evento.respondWith(null);
    }
    else{
        evento.respondWith(fetch(evento.request));
    }
    */

    //Acá por ejemplo vamos a hacer algo con las imágenes
    /*
    if(evento.request.url.includes('.jpg')){
        console.log(evento.request.url);
        // Formas de hacer las peticiones
        //let fotoReq = fetch('img/main.jpg');
        //let fotoReq = fetch(evento.request.url);
        let fotoReq = fetch(evento.request);

        evento.respondWith(fotoReq);
    }
    */

    // Ejemplo de como modificamos la respuesta de la petición Fetch
    /*
    if(evento.request.url.includes('style.css')){
        //NOTA: El objeto Response es el resultado de cualquier petición Fetch
        // Para más información revisar la documentación en: https://developer.mozilla.org/es/docs/Web/API/Response
        let respuesta = new Response(`
            body{
                background-color: red !important;
                color: pink;
            }
        `, {
            headers: {
                'Content-Type': 'text/css'
            }
        });
        evento.respondWith(respuesta);
    }
    */

    // Solución de la tarea en la cual interceptamos la petición de la imágen para devolver otra
    /*
    if(evento.request.url.includes('main.jpg')){
        let respuesta = fetch('img/main-patas-arriba.jpg');
        evento.respondWith(respuesta);
    }
    */

    //Ejercicio para el manejo de errores en el Fetch Event
    //Para este proceso vamos a cambiar en el index.html el llamdo a main.jpg para simular una petición
    //que no existe
    //OJO: Acá en este cas se esta haciendo para todo, es decir, si falla por ejemplo la petición al style.css este se va a interpertar como una imágen
    //por lo tanto es mejor organizar y validar correctamente, pero para el ejercicio lo dejamos como está 
    const respuesta = (
        fetch(evento.request)
            .then(resp => {
                //console.log(resp);
                /*if(resp.ok){
                    return resp;
                }
                else{
                    return fetch('img/main.jpg');
                }*/

                //Podemos usar el operador ternario para ajustar y hacer más legible el código
                return resp.ok ? resp : fetch('img/main.jpg');

            })
    );
    evento.respondWith(respuesta);

});