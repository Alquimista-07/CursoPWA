// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

// Nos creamos un pequeño arreglo de mensajes, estos mensajes bien podrían estar almacenados
// en una base de datos cualquiera, pero en este ejercicio lo bamos a manejar como un arreglo
// para que sea bastante sencillo.
// NOTA: Cabe resaltar que estos mensajes no se estan almacenando de forma persistente y cada vez que
//       recargue el navegador web, estos se van a purgar
const mensajes = [
  {
    _id: '001',
    user: 'Spiderman',
    mensaje: 'Hola! les habla su amigo Spiderman.'
  },
  {
    _id: '002',
    user: 'IronMan',
    mensaje: 'Les habla Iron Man desde su nuevo Mark 50.'
  },
  {
    _id: '003',
    user: 'Hulk',
    mensaje: 'Mi secreto es que siempre estoy furioso.'
  },
  {
    _id: '004',
    user: 'Thor',
    mensaje: 'Un rey sabio nunca busca la guerra, pero debe estar preparado.'
  }
];




// Get mensajes
// Para probar esta ruta get mensajes con ayuda de postman pasamos la siguiente ruta http://localhost:3000/api
// y la enviamos para ver el resultado.
// NOTA: Estamos indicando /api en la ruta porque en el archivo server.js en las rutas le estamos indicando que se va a acceder
//       a él a través de /api
router.get('/', function (req, res) {
  //res.json('Obteniendo mensajes');
  // Para obtenere los mensajes comentamos la antrerior respuesta y hacemos lo siguiente:
  res.json( mensajes );
});

// Post mensajes
// Ahora creamos un servicio que nos permita realizar una petición POST
// para el posteo de los mensajes
router.post('/', function (req, res) {

  // Ahora para esto vamos a usar la dependencia de body parser que se instalo con el comando npm install body-parser --save
  // y con las lineas de codigo que se argregaron en el archivo server.js
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log( mensajes );

  res.json({
    ok: true,
    mensaje // Acá se puede hacer mensaje: mensaje pero en Ecmascript 6 ya es redundante
  });
});


module.exports = router;