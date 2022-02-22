

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}


//Para la explicacion del manejo del evento fetch vamos a hacer la petición a una api rest
// Comentamos la siguiente parte de codigo con el fin de que no interfiera para la explicación del evento sync
// ya que tiene console y demás
/*
fetch('https://reqres.in/api/users')
    .then(resp => resp.text())
    .then(console.log);
*/