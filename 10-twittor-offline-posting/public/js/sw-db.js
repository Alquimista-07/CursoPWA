// Archivo auxiliar en el cual se va a incluir la lógica necesaria para
// almacenar en Indexeddb con la ayuda de la alibrería que se uso en secciones
// anteriores llamada PouchDB

// Utilidades para grabar PouchDB

const db = new PouchDB('DBMensajes');

function guardarMensaje( mensaje ){

    // Para guardar con PouchDB necesito colocarle un id al objeto y por eso lo transformamos cuando hicimos const bodyObj = JSON.parse( body ); en 
    // el archivo se-utils.js en la función manejoApiMensajes( cacheName, req )
    mensaje._id = new Date().toISOString();

    // Ahora lo tengo que grabar en el indexeddb
    db.put( mensaje ).then( () => {

        console.log('Se grabo en base de datos local(Indexeddb) para posterior posteo');
    
    });

}