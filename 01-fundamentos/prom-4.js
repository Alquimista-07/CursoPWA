//Promise Race

function sumarLento (numero){

    return new Promise(function(resolve, reject){

        setTimeout( function() {
            
            resolve(numero+1);
            //reject('Sumar lento falló');

        }, 800);

    });

}

let sumarRapido = (numero) => {

    return new Promise((resolve, reject) => {
        
        setTimeout(()=> {
            //resolve(numero + 1);
            reject('Error en sumar rapido');
        }, 1000);

    });

}

// El promise race funciona de una forma parecida al promise all con la diferencia
// de que el promice race pone a competir todos los parámetros ingresados en el arreglo
Promise.race([sumarLento(5), sumarRapido(10)])
    .then(respuesta => {
        console.log(respuesta);
    })
    .catch(console.log);