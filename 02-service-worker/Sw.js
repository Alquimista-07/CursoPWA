//console.log('SW: Hola Mundo!!!...');

// No es normal escribir codigo JavaScript dentro de este archivo, es decir, que no se pueda hacer
// pero normalmente el Service Worker (SW) va a contener acciones a sucesos que sucedan en la página o en nuestra aplicación

//Usamos la palabra self para hacer referencia al SW
self.addEventListener('fetch', evento => {

    console.log(evento);

});