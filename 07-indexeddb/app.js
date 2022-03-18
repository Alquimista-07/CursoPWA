
// indexedDB: Reforzamiento

// Validamos si el navegador soporta indexeddb
if ( !window.indexedDB ){
    window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
}
else{

// Vamos a crear el espacio de la base de datos.
// Por parametro pasamos el nombre y la versión la cual es opcional
let request = window.indexedDB.open('mi-database', 1);

// Cuando nosotros modificamos cualquier cosa de la base de datos, inclusive cuando la actualizamos,
// tenemos que manejar todos los request o todos los listeners nosotros mismos manualemente y esto ya inicia a ser
// un dolor de cabeza.
// Y se actualiza cuando se crea o se sube la versión de de la DB
request.onupgradeneeded = event => {
    
    console.log('Actualización de BD');

    // Una vez ya estamos dentro de este evento ya vamos a poder obtener la referencia a la BD
    // y para esto lo hacemos de la siguiente forma:
    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

}

}