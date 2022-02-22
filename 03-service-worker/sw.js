
// Ciclo de vida del SW

// Evento de la instalación
self.addEventListener('install', evento => {

    //Normalmente en el evento de la instalación nosotros hacemos cosas como:

    //Desargar assets
    //Creamos un cache

    console.log('SW: Instalando SW');

    //Si queremos que el nuevo SW tome el control inmediatamente que se instala, es decir, que el esperar a que
    //el cliente cierre todos los tabs o la acción que hacemos en las herramientas de desarrollo de darle skip podemos
    //hacer lo siguiente:
    
    //self.skipWaiting();
    
    //NOTA: No es recomendable dejarlo porque puede ser que el usuario este trabajando con algo del SW, por ejemplo recibir una notificación push,
    //o algo importante que puede estar sucediendo que le interesa al usuario pero como saltamos lo del anterior SW pueda ser que no ejecute el codigo y
    //perder la información importante que el cliente este esperando, lo mejor es que el cliente cierr la app web para que el nuevo SW entre en funcionamiento

    const instalacion = new Promise((resolve, reject) => {

        //Simulación de que nuestra instalación se tarda un segundo
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            //Usamos la linea dar skip cuando se detecta un nuevo SW y la cual se explico anteriormente
            self.skipWaiting();
            //Llamamos la resolucion de la promesa
            resolve();
        }, 1000);

        

    });

    //Nota: Por ejemplo simulando un caso en el que nuestro SW no se tiene que activar hasta que se termine la instalación, ya sea porque durante la instalación
    //requerimos que se descarguen recursos necesarios los cuales si no son descargados durante la instalación nos podría arrojar un error la aplicación.
    //Por lo tanto, esto lo podemos solucionar agregando la siguiente intrucción de código para esperar que finalice primero un evento, en este caso la instalación antes de realizar la activación del SW.
    evento.waitUntil(instalacion);
});

//Evento de la activación del SW
//Cuando el SW toma el control de la aplicación
self.addEventListener('activate', evento => {
    
    // Usualmente el evento activate es un buen momento para:
    //Borrar cache viejo
    console.log('SW: Activo y listo para controlar la App');
});