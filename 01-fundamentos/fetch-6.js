// En este ejercicio se explica como se hace el manejo de respuestas y errores

//fetch('https://reqres.in/api/users/1')
fetch('https://reqres.in/api/users/1000')
    .then(resp => {

        // Para validar el error usamos el metodo ok devuelto en la petición
        // este metodo es propio de la sintaxis y lo podemos validar con un console.log
        // e imprimir la respuesta
        
        //console.log(resp);
        
        if(resp.ok){
            return resp.json();
        } 
        else{
            //console.log('No existe el usuario 1000');
            throw new Error('No existe el usuario 1000');
        }

    })
    .then(console.log)
    .catch(error => {
        console.log('Error en la petición');
        console.log(error);
    });