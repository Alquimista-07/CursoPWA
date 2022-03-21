
var url = window.location.href;
var swLocation = '/twittor/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register( swLocation );
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

// El usuario, contiene el ID del hÃ©roe seleccionado
var usuario;




// ===== Codigo de la aplicaciÃ³n

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

    // Envío de la petición POST
    fetch('api', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    })
    .then( res => res.json())
    .then( res => console.log( 'app.js', res))
    .catch(err => console.log('app.js error: ', err));

    crearMensajeHTML( mensaje, usuario );

});

// Creamos nuevas funciones
// Obtener mensajes del servidor, es decir, vamos a consumir el servicio REST
function getMensajes(){

    fetch('api')
        .then(res => res.json() )
        .then( posts => {

            console.log(posts);
            // Ahora para renderizar y mostra los mensajes existe una función que se llama
            // crearMensajeHTML, entonces recorremos los mensajes y llamamos la función mencionada.
            posts.forEach( post => {
                crearMensajeHTML(post.mensaje, post.user);
            });

        });

}

// Llamanos la función después de ser declarada porque cuando el archivo app.js sea leido
// va a definir la funición y necesito que la ejecute inmediatamente  para que cargue los mensajes
getMensajes();

// Detectar cambios de conexión a internet
function isOnline(){

    if( navigator.onLine ){

        // Tenemos conexión
        console.log('Online');

        // Usando JQuery usamos el Toast para mostrar los mensajes de Onlin y Offline en el 
        $.mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!',
            type: 'info'
        });

    }
    else{

        // No tenemos conexión
        console.log('Offline');
        // Usando JQuery usamos el Toast para mostrar los mensajes de Onlin y Offline en el 
        $.mdtoast('Offline', {
            interaction: true,
            actionText: 'OK!',
            type: 'warning'
        });

    }

}

// Ahora nosotros debemos disparar la función isOnline() en algún momento
// pero no es solo dispararla sino que es estár pendientes de la conexión,
// que es lo más importante y para ello creamos unos listeners
window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();