

// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {


    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch( req )
                .then( res => {
                    return actualizaCacheDinamico( staticCache, req, res );
                });
    }



}

// Network with cache fallback / update
function manejoApiMensajes( cacheName, req ) {

    // Como el cache ne maneja la petición POST, y nos da error al enviar el mensaje desde la aplicación web, 
    // nosotros tenemos que aplicar un tipo de estrategia especial
    if( req.clone().method === 'POST' ){

        // Ahora para el tema de sincronización, como todos los navegadores web aún no soportan el syncmanagaer
        // y el cual se puede validar en https://caniuse.com/?search=syncmanager nosotros debemos tenerlo en cuenta
        // y validar si mi navegador web actualmente dispone de la funcionalidad ya que de otra manera no se pueden 
        // realizar tareas asíncronas que nos van a permitir por ejemplo postear mensajes luego de recuperar conexión
        // a internet
        if ( self.registration.sync ){

            // POSTEO de un nuevo mensaje
            // Interceptamos lo que me estan enviando y extraemos la información
            return req.clone().text().then( body => {

                console.log( body );
                const bodyObj = JSON.parse( body ); // Acá lo que hago es obtener el string que viene en formato de json y transformalo en un objeto json que puedo extraer con sus propiedades, adicionalmente otra ventaja es que podemos agregar propiedades al mismo
                return guardarMensaje( bodyObj );

            });

        }
        else{

            // Si no soporta las tareas asíncronas solo dejamos pasar la petición
            return fetch( req );

        }


    }
    else{

        // Lo primero que hacemos es intentar traer los datos más actualizados
        return fetch( req ).then( res => {

            if( res.ok ){
                actualizaCacheDinamico( cacheName, req, res.clone() );
                return res.clone();
            }
            else{
                return caches.match( req );
            }

        }).catch( err => {
            console.log(err);
            return caches.match( req );
        });

    }


}
