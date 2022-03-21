// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


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


  res.json({
    ok: true,
    mensaje
  });
});

// Empezamos con las configuraciones que vamos a necesitar en nuestro backend para hacer toda la suscripci´n
// y poder enviar notificaciones push.

// Ahora necesito varias rutas nuevas

// Almacenar la subscripción
router.post('/subscribe', (req, res) => {

  res.json('subscribe');

});

// Obtener el key publico
router.get('/key', (req, res) => {

  res.json('key publico');

}); 

// Enviar una notificación PUSH a las personas que nosotros
// queramos.
// NOTA:  Normalmente es no es hecho mediante un servicio REST 
//        ya que esto ES ALGO que se controla del lado del server.
//NOTA 2: Por lo tanto esta ruta /push me va a ayudar a mi a poder enviar 
//        notificaciones PUSH mediante Postman ya que normalmete este no es un
//        servicio que este expuesto ya que sería algo que solo corra nuestro backend
router.post('/push', (req, res) => {

  res.json('push');

}); 


module.exports = router;