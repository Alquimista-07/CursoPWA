

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    //navigator.serviceWorker.register('/sw.js');
    navigator.serviceWorker.register('/sw.js')
    .then(registro => {
        //Lo que vamos a hacer acá es realizar el registro de una terea asincrona cuando no hay conexión a internet
        //Entonces acá por el momento lo que se va a hacer es engañar a la computadora para simular una tarea pero
        //conforme avance el curso luego lo haremos real
        setTimeout(() => {
            
            registro.sync.register('posteo-gatitos');
            console.log('Se enviaron fotos de gatitos al server');
            //NOTA: Aunque esto no es del todo cierto, se va a hacer cuando hagamos el posteo de gatitos,
            //Entonces cuando se registre esta terea y recuperemos la conexión a internet se debería ejecutar el evento sync, es decir, 
            //deberíamos ver los console colocados en el evento sync

        }, 3000);
    });
}


//Para la explicacion del manejo del evento fetch vamos a hacer la petición a una api rest
// Comentamos la siguiente parte de codigo con el fin de que no interfiera para la explicación del evento sync
// ya que tiene console y demás
/*
fetch('https://reqres.in/api/users')
    .then(resp => resp.text())
    .then(console.log);
*/

//-----------------------------------------------------------//
//Complemento para la explicación del evento sync
//-----------------------------------------------------------//
//Usualmente no todos los navegadores web que soportan el SW soportan la tecnologia de sincronización.
//Para mas información podemos revisar: https://caniuse.com/?search=syncmanager

//Para el problema de la incompatiblidad en caso de que un usuario estuviera usando un navegador que no soporte la tecnología syncmanager
//nosotros generalmente validariamos primero la conexión a internet y luego realizariamos el posteo

//if(window.SyncManager){}

//NOTA: Pero para el ejercicio como aún no se entra de lleno para la explicación vamos a modificar el registro del SW