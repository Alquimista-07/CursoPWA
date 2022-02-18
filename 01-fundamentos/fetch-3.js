// Pare que este ejercicio fetch funcione, necesitaremos trabajarlo en
// una página web (index.html)

// Explicación: En el ejercicio anterior (fetch-2.js) realizado anteriormente usamos una petición GET, ahora
// para este ejercicio vamos a usar una petición POST/PUT

// URL a donde quiero hacer la petición POST
// https://reqres.in/api/users

let usuario = {
    nombre: 'Juan',
    Edad: 27
};

fetch('https://reqres.in/api/users', {
    method: 'POST', //PUT
    body: JSON.stringify(usuario), // Data que quiero enviar
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(respuesta => respuesta.json())
.then(console.log)
.catch(error => {
    console.log('Error en la petición');
    console.log(error);
});