
// Ciclo de vida del SW

//*---------------------------------------------------------------------------------------*//
// Evento de la instalación
//*---------------------------------------------------------------------------------------*//
self.addEventListener('install', evento => {

    //Normalmente en el evento de la instalación nosotros hacemos cosas como:

    //Desargar assets
    //Creamos un cache

    console.log('SW: Instalando SW');

    //Si queremos que el nuevo SW tome el control inmediatamente que se instala, es decir, que el esperar a que
    //el cliente cierre todos los tabs o la acción que hacemos en las herramientas de desarrollo de darle skip podemos
    //hacer lo siguiente:
    
    //self.skipWaiting();
    
    //NOTA: No es recomendable dejar el evento skipWaiting() porque puede ser que el usuario este trabajando con algo del SW, por ejemplo recibir una notificación push,
    //o algo importante que puede estar sucediendo que le interesa al usuario pero como saltamos lo del anterior SW pueda ser que no ejecute el codigo y
    //perder la información importante que el cliente este esperando, lo mejor es que el cliente cierr la app web para que el nuevo SW entre en funcionamiento

    // Explicación evento waitUntil()
    const instalacion = new Promise((resolve, reject) => {

        //Simulación de que nuestra instalación se tarda un segundo
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            //Usamos la linea dar skip cuando se detecta un nuevo SW y la cual se explico anteriormente
            self.skipWaiting();
            //Llamamos la resolucion de la promesa
            resolve();
        //}, 1000);
        //Ajusteamos para que se ejecute aún más rápido, esto para la explicacion de los eventos del fetch
        }, 1);

        

    });

    //Nota: Por ejemplo simulando un caso en el que nuestro SW no se tiene que activar hasta que se termine la instalación, ya sea porque durante la instalación
    //requerimos que se descarguen recursos necesarios los cuales si no son descargados durante la instalación nos podría arrojar un error la aplicación.
    //Por lo tanto, esto lo podemos solucionar agregando la siguiente intrucción de código para esperar que finalice primero un evento, en este caso la instalación antes de realizar la activación del SW.
    evento.waitUntil(instalacion);
});

//*---------------------------------------------------------------------------------------*//
//Evento de la activación del SW
//*---------------------------------------------------------------------------------------*//

//Cuando el SW toma el control de la aplicación
self.addEventListener('activate', evento => {
    
    // Usualmente el evento activate es un buen momento para:
    //Borrar cache viejo
    console.log('SW: Activo y listo para controlar la App');
});

//*---------------------------------------------------------------------------------------*//
//Explicación del event listener del Fetch
//*---------------------------------------------------------------------------------------*//

//FETCH: Manejo de peticiones HTTP
//Nota: Para este ejercicio también modificamos el archivo app.js para agregar una petición fetch
self.addEventListener('fetch', evento => {

    // Comentamos la siguiente parte de codigo con el fin de que no interfiera para la explicación del evento sync
    // ya que tiene console y demás
    /*
    //Usualmente cuando nosotros hacemos un fetch lo que vamos a hacer acá es:
    //Aplicar la estrategias del cache
    console.log('SW:', evento.request.url);

    if(evento.request.url.includes('https://reqres.in/')){
        const respuesta = new Response(`{
            ok: false,
            mensaje: 'jajaja'
        }`);
        evento.respondWith(respuesta);
    }
    */
});

//*---------------------------------------------------------------------------------------*//
//Explicación del event listener Sync
//*---------------------------------------------------------------------------------------*//

//SYNC: Normalmente es muy util cuando perdimos conexión a internet y la recueperamos
self.addEventListener('sync', evento => {
    
    console.log('Tenemos conexión a internet');
    console.log(evento);
    
    console.log(evento.tag);
    //NOTA: Que es el tag: Normalmente cuando nostros vamos a hacer un posteo, nosotros le vamos a asignar un tag o etiqueta y es algo
    //que le diga por ejemplo esto van a ser los posteos o van a ser los posteos sin conexión, para que cuando recuperemos la conexión
    //y para cuando se dispare este evento de sincronización, entonces se va a revisar por tags que es lo que se debe de hacer.
    
    //El sync por si solo no va a recebir un argumento, osea no se va a recibir la data que nosotros queremos postear ahí,
    //sino que acá viene una combinación con lo que es el indexDB que es una base de datos interna de JavaScript y ya traen los navegadores web
    //y leerla en base al tag y todas las peticiones o todo lo que se encuentre en esa collection de base de datos es lo que se va a postear.
    
    //Pero en este ejemplo no se aplica bien la funcionalidad del evento sync sino como tal solo el disparo del evento.
    //Adicionalmente para este ejemplo vamos a modificar una parte de codigo en el app.js
});