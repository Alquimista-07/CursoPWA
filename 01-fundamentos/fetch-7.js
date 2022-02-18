// Para este ejercicio creamos un nuevo archivo llamaod no-encontrado.html

fetch('no-encontrado.html')
//fetch('no-encontrad2.html')
    .then(resp => resp.text())
    .then(html => {
        //console.log(html);
        
        // Si colocamos mal la sintaxis esta si nos va a disparar el manejo del error, ya que el anterior error
        // en la ruta nos dispara un error 404 que se debería manejar como lo realizamos en el ejercicio fetch-6.js
        //let body = document.querySelecto('body');
        let body = document.querySelector('body');
        body.innerHTML = html;
    })
    .catch(error => {
        console.log('Error en la petición');
        console.log(error);
    })