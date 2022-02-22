

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}


//Para la explicacion del manejo del evento fetch vamos a hacer la petición a una api rest
fetch('https://reqres.in/api/users')
    .then(resp => resp.text())
    .then(console.log);