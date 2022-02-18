// En este ejercicio se explica un error que vamos a tener cuando estemos trabajando con el Fech API
// y las respuestas 

// En este caso nos arroja el error que indica que el body stream no se puede leer dos veces
/*fetch('https://reqres.in/api/users/1')
    .then(resp => {

        resp.json().then(usuario => {
            console.log(usuario.data);
        });

        resp.json().then(usuario => {
            console.log(usuario.data);
        });

    });
*/

// Existe una manera de clonar una petición pero usualamente solo se llama dos veces máximo
// Entonces para resolver el problema mencionado anteriormente hacemos lo siguiente:
fetch('https://reqres.in/api/users/1')
    .then(resp => {
        // Clonamos la respuesta
        resp.clone().json()
        .then(usuario => {
            console.log(usuario.data);
        });

        // Clonamos la respuesta
        resp.clone().json()
        .then(usuario => {
            console.log(usuario.data);
        });

        // Acá lo hacemos normalmente y por lo tanto nos debería devolver las 3 peticiones sin problema
        resp.json().then(usuario => {
            console.log(usuario.data);
        });

    });