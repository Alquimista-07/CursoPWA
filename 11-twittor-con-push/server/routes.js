// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();

// Requerimos el modulo que creamos en el archivo push.js
const push = require('./push');

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);
  // Si quisieramos enviar una notificación cada vez que se envie un nuevo mensaje solo llamamos la función sendPush con los paramtros necesarios del post
  // Por ejemplo:
  const postMensaje = {
    titulo: req.body.user,
    cuerpo: req.body.mensaje,
    usuario: req.body.user
  };

  push.sendPush( postMensaje );

  res.json( postMensaje );

//  res.json({
//    ok: true,
//    mensaje
//  });
});

// Empezamos con las configuraciones que vamos a necesitar en nuestro backend para hacer toda la suscripci´n
// y poder enviar notificaciones push.

// Ahora necesito varias rutas nuevas

// Almacenar la subscripción
router.post('/subscribe', (req, res) => {

  const suscripcion = req.body;

  console.log( suscripcion );

  // Creamos una colection de las subscripciones
  push.addSubscription( suscripcion );

  res.json('subscribe');

});

// Obtener el key publico
router.get('/key', (req, res) => {

  // Retornamos la llave publica directamente al servicio rest solo para probar
  const key = push.getKey();

  // Lo unico que no ocupamos hacer es enviar la llave como un json ya que la requerimos como
  // arrayBuffer, por lo tanto comentamos la siguiente linea y la cambiamos con un send
  //res.json( key );
  res.send( key );

}); 

// Enviar una notificación PUSH a las personas que nosotros
// queramos.
// NOTA:  Normalmente es no es hecho mediante un servicio REST 
//        ya que esto ES ALGO que se controla del lado del server.
//
//NOTA 2: Por lo tanto esta ruta /push me va a ayudar a mi a poder enviar 
//        notificaciones PUSH mediante Postman ya que normalmete este no es un
//        servicio que este expuesto ya que sería algo que solo corra nuestro backend
//
//NOTA 3: Para probar el llamado a esta ruta de la API y enviar la notificación lo que se debe hacer es con 
//        ayuda de POSTMAN colocar la ruta  http://localhost:3000/api/push asignarla como un POST, y posteriormente 
//        en el POSTMAN hacer click en body y en la opcion colocar x-www-form-urlencoded y en los parametros enviar 
//        la información de la siguiente como se muestra en el siguiente ejemplo:
//   KEY               |         VALUE
// titulo              | Saludos a todos
// cuerpo              | Quiero invitarlos a comer pizza
// usuario             | spiderman
//
//OJO el nombre del usuario se debe colocar tal cual como esta el nombre de la imagen en la carpeta
//img/icons/ para que no arroje error y no muestre el icono de la notifiación.
router.post('/push', (req, res) => {

  // Cuando llame el servicio push voy a extraer la información que viene en el post
  const post = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  };

  push.sendPush( post );

  res.json( post );

}); 


module.exports = router;