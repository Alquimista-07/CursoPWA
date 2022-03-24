// imports
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')

importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');


const STATIC_CACHE    = 'static-v2';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
    'js/libs/plugins/mdtoast.min.js',
    'js/libs/plugins/mdtoast.min.css'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    // Cambiamos el fontawesome ya que aunque el servidor ahora tiene implementado lo de CORS aún continua colocando problemas
    //'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js'
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});





self.addEventListener( 'fetch', e => {

    let respuesta;

    if ( e.request.url.includes('/api') ) {

        // return respuesta????
        respuesta = manejoApiMensajes( DYNAMIC_CACHE, e.request );

    } else {

        respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                
                actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE );
                return res;
                
            } else {
    
                return fetch( e.request ).then( newRes => {
    
                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
    
                });
    
            }
    
        });

    }

    e.respondWith( respuesta );

});


// tareas asíncronas
self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if ( e.tag === 'nuevo-post' ) {

        // postear a BD cuando hay conexión
        const respuesta = postearMensajes();
        
        e.waitUntil( respuesta );
    }



});

// Escuchar las notificaciones push
self.addEventListener('push', e => {

    //console.log( e );
    //.log( e.data.text() );

    const data = JSON.parse( e.data.text() );

    // console.log( data );

    const title = data.titulo;
    const options = {
        body: data.cuerpo, // Cuerpo de la notificación
        //icon: 'img/icons/icon-72x72.png' // Icono de la notificación
        icon: `img/avatars/${ data.usuario }.jpg`, // Ajustamos para que al enviar la notificación aparezca la imagen del usuario que la esta enviando
        badge: 'img/favicon.ico', // Este es el icononito que vamos a ponerle para que se muenstre en la barra de notificaciones de dispositivos Android
        image: 'https://datainfox.com/wp-content/uploads/2017/10/avengers-tower.jpg', // También podemos colocar una imágen completa
        vibrate: [125,75,125,275,200,275,125,75,125,275,200,600,200,600], // Patron de vibración, para ver más patrones revisar la documentación en: https://gearside.com/custom-vibration-patterns-mobile-devices/         // NOTA: En el vibrate indica cuantas milesimas de segundo vibra, cuantas no, cuantas si y así sucesivamente
        openURL: '/', // Direción que queremos que abra cuando recibimos la notificación, es decir, cuando hacemos click sobre ella
        data: { // Esta es la data que va a ser contenida en la notificación
            url: 'https://google.com', // Aca va url que quisieramos que viera el usuario, en este caso del ejemplo colocamos cualquier cosa
            id: data.usuario
        },
        actions: [ // Podemos crear acciones personalizadas para que funcionen con la interación al tocar la notificación, por ejemplo eliminar, actualizar, etc y se pueden crear cuantas queramos pero no es aconsejable demasiadas, tal vez 3 máximo
            {
                action: 'thor-action',
                title: 'Thor',
                icon: 'img/avatar/thor.jpg'
            },
            {
                action: 'ironman-action',
                title: 'Ironman',
                icon: 'img/avatar/ironman.jpg'
            }
        ]
    };

    e.waitUntil( self.registration.showNotification( title, options ) );

});

// NOTA: Hay 2 event listeners realacionados con las notificaciones, entonces para ello los vamos a agregar
//
// Cuando se cierra la notificación
self.addEventListener('notificationclose', e =>{

    console.log('Notificación cerada', e)

});

// Cuando se hace click en la notificación y es el más importante de todos y es el que más nos interesa porque es el más común que se usa
self.addEventListener('notificationclick', e=> {

    const notificacion = e.notification;
    const accion = e.action;

    console.log({ notificacion, accion });

    // Cerramos la notificación
    notificacion.close();

});