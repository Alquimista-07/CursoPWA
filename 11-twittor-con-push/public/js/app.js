
var url = window.location.href;
var swLocation = '/twittor/sw.js';

var swReg;


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }

    // Optimizamos para que el registro del SW se haga hasta que el navegador cargue en su totalidad
    // todo lo que es la aplicación.
    window.addEventListener('load', function() {

        navigator.serviceWorker.register( swLocation ).then( function (reg){

            swReg = reg;
            
            // Una vez cargue quiero confirmar si ya estoy suscrito a las notificaciones o no
            swReg.pushManager.getSubscription().then( verificaSuscripcion ); // Llamamos la función verificaSuscripcion sin los () porque quiero que ejecute la función inmediatamente

        });

    });

}





// Referencias de jQuery

var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

var btnActivadas    = $('.btn-noti-activadas');
var btnDesactivadas = $('.btn-noti-desactivadas');

// El usuario, contiene el ID del hÃ©roe seleccionado
var usuario;




// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {

    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelarBtn.click();

}



// Globals
function logIn( ingreso ) {

    if ( ingreso ) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');

        titulo.text('Seleccione Personaje');
    
    }

}


// Seleccion de personaje
avatarBtns.on('click', function() {

    usuario = $(this).data('user');

    titulo.text('@' + usuario);

    logIn(true);

});

// Boton de salir
salirBtn.on('click', function() {

    logIn(false);

});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {

    modal.removeClass('oculto');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});


// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
    if ( !modal.hasClass('oculto') ) {
        modal.animate({ 
            marginTop: '+=1000px',
            opacity: 0
         }, 200, function() {
             modal.addClass('oculto');
             txtMensaje.val('');
         });
    }
});

// Boton de enviar mensaje
postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }

    var data = {
        mensaje: mensaje,
        user: usuario
    };


    fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    })
    .then( res => res.json() )
    .then( res => console.log( 'app.js', res ))
    .catch( err => console.log( 'app.js error:', err ));



    crearMensajeHTML( mensaje, usuario );

});



// Obtener mensajes del servidor
function getMensajes() {

    fetch('api')
        .then( res => res.json() )
        .then( posts => {

            console.log(posts);
            posts.forEach( post =>
                crearMensajeHTML( post.mensaje, post.user ));


        });


}

getMensajes();



// Detectar cambios de conexión
function isOnline() {

    if ( navigator.onLine ) {
        // tenemos conexión
        // console.log('online');
        $.mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!'
        });


    } else{
        // No tenemos conexión
        $.mdtoast('Offline', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });
    }

}

window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );

isOnline();

// Notificaciones

function verificaSuscripcion( activadas ){

    console.log( activadas );

    // Aca lo que queremos hacer es validar si las notificaciones están activadas o desactivadas
    // y cambiar las propiedades de los botones dependiendo de cada caso.
    // NOTA: La clase oculto se encuentra en nuesto archivo css/style.css
    if( activadas ){

        btnActivadas.removeClass('oculto');
        btnDesactivadas.addClass('oculto');

    }
    else{

        btnActivadas.addClass('oculto');
        btnDesactivadas.removeClass('oculto');

    }

}

// Ojo de momento para dejar los botones de las notificaciones desactivados llamamos la función
//verificaSuscripcion(); // Quitamos el llamado a esta función ya que la estamos llamando al momento de cargar el SW con la optimización del event listener load

// Vamos a crear unas funciones para pedirle al usuario que me de acceso a enviarle -> notificame()
// y para personalizar la notificación -> enviarNotificacion()
function enviarNotificacion(){

    const notificationOpt = {
        body: 'Este es el cuerpo de la notificación',
        icon: 'img/icons/icon-72x72.png'
    }

    const notif = new Notification('Hola Mundo', notificationOpt);

    notif.onclick = () => {
        console.log('Click');
    };

}

function notificame(){

    // Verificamos si el navegador soporta notificaciones
    if ( !window.Notification ){
        console.log('Este navegador no soporta notificaciones');
        return;
    }

    // La clase notification tiene 3 estados: default, denied y granted
    // Por lo tanto acá lo que quiero es una confirmación si ya se le ha 
    // otorgado el derecho granted, es decir, si ya anteriormente le habiamos
    // preguntado al usuario si deseaba recibir notificaciones 
    if ( Notification.permission === 'granted' ){

        //new Notification('Hola Mundo!!!... - granted');
        enviarNotificacion();

    }
    else if( Notification.permission !== 'denied' || Notification.permission === 'default'){

        // Realizamos la solicitud al usuario
        Notification.requestPermission( function( permission ) {

            console.log(permission);

            if(permission === 'granted'){
                //new Notification('Hola Mundo!!!... - pregunta');
                enviarNotificacion();
            }

        });

    }

}

// Llamamos la función que se creo para las notificaciones
//NOTA: Comentamos la función para que la notificación no se lance cuando abrimos la aplicación en el navegador
// notificame();

// Luego de encriptarla tenemos que tomarla y prepararla en el frontend para crear nuestra subscripción
// Get Key
function getPublicKey(){

    // Probamos si obtenemos la llave publica, pero no es como la necesito,
    // por lo tanto esta comentado este codigo
    /*
    fetch('api/key')
        .then( resp => resp.text())
        .then( console.log );
    */

    return fetch('api/key')
        .then( res => res.arrayBuffer() )
        // retornar arreglo, pero como un Uint8array
        .then( key => new Uint8Array(key) )

}

// Comentamos esta línea porque ya no la necesito
//getPublicKey().then( console.log ); 

// Necesito realizar la subscripción cuando haga click sobre el botón
// por lo tanto vamos a programar el evento click del botoón
btnDesactivadas.on('click', function() {

    // Validamos si existe el registro del SW, aunque con la lógica implementada en el event listener load
    // al momento de registrar el SW el botón no va a aparecer hasta que el SW este registrado, pero
    // no esta de más hacerlo
    if( !swReg ) return console.log('No hay registro de SW');

    // Pero si existe hacemos lo siguiente
    getPublicKey().then( function( key ) {

        swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key
        })
        .then( res => res.toJSON() )
        .then( suscripcion => {

            //console.log(suscripcion);

            // Hacemos el posteo de la subscripcion
            fetch('api/subscribe', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify( suscripcion )
            })
            .then( verificaSuscripcion )
            .catch( console.log );
            
            // Le enviamos la suscripcion a la función ya que cabe aclarar que la función hace una validación
            // en la cual si recibe undefined o null coloca unas propiedades a los botones y en caso de recibir otra
            // cosa, como por ejemplo en este caso la llave publica de la suscripción cambia las propiedades 
            // de los botones de otra forma.
            //verificaSuscripcion(suscripcion); // Comentamos esta línea ya que la estoy llamando en la promesa en el fetch del post

        });

    });

});