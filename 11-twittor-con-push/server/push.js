//--------------------------------------------------------------------------------------
// Notas Importantes sección 10 en el video 119. Generar la llave pública y privada
//--------------------------------------------------------------------------------------
// Para este tema vamos a necesitar el paquete web-push el cual se instala con el comando
// npm i web-push --save (NOTA: Para instalarlo como una dependecia local, es decir, solo para usarlo en el proyecto actual lo instalamos como npm i web-push --save 
// y para que sea global npm install web-push -g) y básicamente este paquete nos permite crear VAPID Keys que es un juego de llaves que nos va servir para enviar notificaciones push.
//
//OJO: Cada vez que generemos nuevas llaves todas las suscripciones que teniamos dejan de funcionar por lo cual hay que tener cuidado a la hora de generar nuevos VAPID Keys.
//
// Por lo tanto ahora lo que quiero hacer es ejecutar un comando que genere los VAPID Keys y los envie a un archivo json solo cuando yo sienta que lo necesito, para ello agregamos en 
// nuestro archivo package.json el siguiente comando: "generate-vapid":"node ./node_modules/web-push/src/cli.js generate-vapid-keys --json > server/vapid.json" y posteriormente para 
// probar el comando ejecutamos en la terminal npm run generate-vapid
//--------------------------------------------------------------------------------------

const vapid = require('./vapid.json');

// Ahora para el tema en el cual nosotros vamos a configurar nuestro web push (Video:125. Configurar web-push),
// vamos a hacer lo siguiente:
const webpush = require('web-push'); // NOTA: Revisar documentación en: https://www.npmjs.com/package/web-push

// Ahora nos pieden que configuremos nuestros VAPID Keys para ello hacemos lo siguiente:
webpush.setVapidDetails(
    'mailto:jdca.07@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

// Ahora vamos a usar el packete de node URL Safe Base64 para retornar nuestra llave de forma segura codificada
// para ello instalamos el paquete usando el comando npm install urlsafe-base64 y lo requerimos
const urlsafeBase64 = require('urlsafe-base64');

// Usamos un paquete de node que nos va a ayudar a almacenar nuestras subscripciones en un archivo
// para evitar perderlas cuando el servidor por algún motivo se reinicie.
const fs = require('fs');

// Creamos un arreglo para almacenar las suscripciones
//const suscripciones = [];
// Ahora lo que debería hacer es que cuando recargue el navegador web mantenga las subscripciones, es decir,
// deberia tener en mi arreglo todas las subsripciones, es decir leer el contenido del archivo subs-db.json
// NOTA: Ojo si al ejecutar el proyecto arroja el error que no puede encontrar el modulo subs-db.json lo que debemos hacer es
//       crear el archivo en la carpeta server y agregarlo como un arreglo json vacío es decir dentro del archivo colocamos [] y listo
let suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};

// Modulo para agregar y almacenar las subscripciones a un arreglo
module.exports.addSubscription = ( suscripcion ) => {

    suscripciones.push( suscripcion );
    
    //console.log( suscripciones );

    // NOTA: Esto de guardar las subscripciones también las podríasmos almacenar en una DB y no en un archivo plano como en el ejemplo del curso
    fs.writeFileSync( `${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ) );

};

// Creamos un modulo para el envio de las notificaciones
module.exports.sendPush = ( post ) => {

    console.log('Mandando PUSHES');

    // El envío de las notificaciones es muy rápido para ello voy a esperar que la promesa /(suscripciones.forEach...) que me recorre las suscripciones termine.
    // Para ello lo mentemos en un arreglo para guardar la promesa de las notificaciones
    const notificacionesEnvadas = [];

    // NOTA: Ojo el post es la información que queremos mandar a través del push

    // Ahora lo que quiero hacer acá es enviarle un mensaje a todas la subscripciones
    // que tengo en mi arreglo de subscripciones
    suscripciones.forEach( (suscripcion, i ) => {

        // Acá adentro ya tengo la suscripción a la cual le puedo mandar una notificación push
        // entonces para enviarla hacemos lo sugiente:
        // El primer argumento: Es la suscripcion como tal, es la información del endpoint, los keys, auth, etc.
        // El segundo argumento: Es el payload o la información en bruto que queremos enviar, pero no lo podemos enviar como un objeto
        //                       hay que convertirlo en json
        //
        // NOTA: Ahora para el tema para eliminar las notificaciones que ya no son vijentes ajustamos un poco el siguiente código para convertirlo en una promesa
        //webpush.sendNotification( suscripcion,  JSON.stringify( post ) );
        const pushProm = webpush.sendNotification( suscripcion,  JSON.stringify( post ) )
            .then( console.log('Notificación enviada') )
            .catch( err => {
                console.log('Notificación falló');
                //Ahora yo se que el código del error para saber que algo ya no existe es 410 entonces hacemos lo siguiente:
                if( err.statusCode === 410 ){ // GONE, ya no existe
                    // Acá tenemos que borrar la suscripción y para ello lo que quiero hacer es marcar las notificaciones que quiero borrar
                    // ya que si yo la borro inmediatamente mientras recorro en teoria me voy a saltar al siguiente registro del foreach y por eso las marcamos antes de borrarlas,
                    // pero eso no indica que yo no las pueda borrar mientras recorro pero lo mejor seria marcarlas primero y luego borrarlas en cascada
                    suscripciones[i].borrar = true; // le agregamos una nueva propiedad llamada borrar
                }
            });

            notificacionesEnvadas.push( pushProm );

    });

    // Ahora para borrarlas hacemos lo siguiente:
    Promise.all( notificacionesEnvadas ).then( () => {
        // Borramos todas las suscripciones que tengan la bandera borrar en true
        suscripciones = suscripciones.filter( subs => !subs.borrar ); // Dejamos solo las que no estan borradas
        // Luego actualizamos la base de datos o reescribimos el archivo en el caso del ejemplo
        fs.writeFileSync( `${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ) );
    });

};