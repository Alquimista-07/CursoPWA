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
// Ahora vamos a usar el packete de node URL Safe Base64 para retornar nuestra llave de forma segura codificada
// para ello instalamos el paquete usando el comando npm install urlsafe-base64 y lo requerimos
const urlsafeBase64 = require('urlsafe-base64');

// Creamos un arreglo para almacenar las suscripciones
const suscripciones = [];

module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};

// Modulo para agregar y almacenar las subscripciones a un arreglo
module.exports.addSubscription = ( suscripcion ) => {

    suscripciones.push( suscripcion );
    
    console.log( suscripciones );

}