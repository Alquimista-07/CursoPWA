// Pare que este ejercicio fetch funcione, necesitaremos trabajarlo en
// una página web (index.html)

// Explicación: Ahora para este ejercicio vamos a hacer lo mismo que en el ejercicio fetch-1.js pero con la diferencia
// que vamos a usar Fetch API

// URL a donde quiero hacer la petición GET
// https://reqres.in/api/users

fetch('https://reqres.in/api/users')
    .then((resp) => {
        //console.log(resp);
        // Ahora para ver como obtengo la información proveniente en el ReadableStream hago lo siguiente
        resp.json().then(console.log);
    });

// El codigo anterior aún se puede mejorar para ello se realiza de la siguiente forma:
fetch('https://reqres.in/api/users')
    .then(resp2 => resp2.json())
    .then(respObj => {
        console.log(respObj);
        console.log(respObj.page);
        console.log(respObj.per_page);
    });

// En el ejercicio 22.Fetch API de los videos de Udemy: PWA - Aplicaciones Web Progresivas: De cero a experto a partir del minuto 5:00
// hay una demostración de cross cuando se hace una petición de mi dominio a otro dominio que no tiene habiitado
// el cross domain origin.

//NOTA: La siguiente url es el acceso a la documentación de los response al fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Response