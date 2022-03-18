
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

};

// Manejo de errores
request.onerror = event => {

    console.log('DB error: ', event.target.error);

};

// Insertar datos en la DB
request.onsuccess = event => {

    let db = event.target.result;

    // Creamos un arreglo de la información que queremos postear a nuestra
    // DB local
    let heroesData = [
        {
            id: '1111',
            heroe: 'Spiderman',
            mensaje: "Aquí su amigo Spiderman"
        },
        {
            id: '2222',
            heroe: 'Iron Man',
            mensaje: "Aquí en mi nuevo Mark 50"
        }
    ];

    // Ahora para grabar los datos tengo que crear una transacción
    // y la cual recibe 2 argunentos, el primero es la referencia al objeto donde vamos a guardar,
    // en el segundo tengo que especificar si la transacción es de lectura o de lectura y escritura
    //
    // readonly = Solo lectura
    // readwrite = Lectura y escritura
    //
    let heroesTransaction = db.transaction( 'heroes', 'readwrite');

    // Esta transacción podría fallar por alguna razón
    // por lo tanto manejamos el error
    heroesTransaction.onerror = event => {
        console.log('Error guardando los datos', event.target.error);
    };

    // Si la transacción se realiza de forma exitosa, informamos sobre el éxito de la trx
    heroesTransaction.oncomplete = event => {
        console.log('Transacción exitosa!!!...', event);
    };

    // Ahora necesitamos un objeto de esa transación
    let heroesStore = heroesTransaction.objectStore('heroes');

    //Ahora vamos a barrer el arreglo para insertra los registros 1 por 1
    // y con esto hacemos la insersión
    for ( let heroe of heroesData ){
        heroesStore.add( heroe );
    }

    // Ahora si la inserción se hace
    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado a la base de datos');
    };


};

}