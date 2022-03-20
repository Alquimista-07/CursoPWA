

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

        // POSTEO de un nuevo mensaje
        // Interceptamos lo que me estan enviando y extraemos la información
        req.clone().text().then( body => {

            console.log( body );
            const bodyObj = JSON.parse( body ); // Acá lo que hago es obtener el string que viene en formato de json y transformalo en un objeto json que puedo extraer con sus propiedades, adicionalmente otra ventaja es que podemos agregar propiedades al mismo
            guardarMensaje( bodyObj );

        });

        // Tengo en cuenta que luego debería guardar en el Indexedcb

        // De momento solo dejamos pasar la petición
        return fetch( req );

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
