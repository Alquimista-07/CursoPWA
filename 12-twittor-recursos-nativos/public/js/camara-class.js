// Clase que contiene la lógica para inicializar la cámara
// Usando Ecmacscript 6

// NOTA: Documentación MDN - Media Devices
//       Este artículo de MDN, les ayudará a tener mejor control de la cámara en sí.
//
//       Media Devices -> https://developer.mozilla.org/es/docs/Web/API/MediaDevices/getUserMedia
//
//       También incluye cómo utilizar por defecto la cámara posterior.

class Camara {

    // Cuando se crea una nueva instancia de la cámara
    constructor( videoNode ){

        // Hacemos referencia al video del index.html definido en la clase camara-contenedor
        // para obtener el stream de datos
        this.videoNode = videoNode;
        console.log( 'Cámara Class init ');

    }

    // Creamos un metodo para encender la cámara
    encender(){

        // Validamos si soporta la cámara
        if( navigator.mediaDevices){

            navigator.mediaDevices.getUserMedia({
                audio: false, // No vamos a usar el audio ya que solo vamos a tomar fotos
                video: { width: 300, height: 300 } // Acá definimos los pixeles para no usar toda la capacidad de la cámara ya que generalmente sería demasiado con los celulares medernos
            }).then( stream => {

                this.videoNode.srcObject = stream;
                this.stream = stream; // Creamos una propiedad llamada stream y la inicializamos

            });

        }

    }

    // Creamos un metodo para apagar la cámara
    apagar(){

        // Para apagar podríamos cancelar el stream pero lo que sucede es que aún lo necesitamos
        // por lo tanto lo que vamos a hacer es pausarlo
        this.videoNode.pause();

        if( this.stream){
            // Detenemos el stream
            this.stream.getTracks()[0].stop();
        }

    }

    // Creamos un metodo para tomar la foto el cual basicamente va a ser igual siempre que queramos
    // hacer esto
    tomarFoto(){

        // Crear un elemento canvas para renderizar ahí la foto
        let canvas = document.createElement('canvas');

        // Colocar las dimensiones del canvas igual al elemento del video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        // Obtener el contexto del canvas
        let context = canvas.getContext('2d'); // Una simple imágen

        // Dibujamos o renderizamos la imágen
        context.drawImage( this.videoNode, 0, 0, canvas.width, canvas.height );

        // Estraemos la imágen
        this.foto = context.canvas.toDataURL(); // Genera un stream en base 64 que puedo usar en cualquier src de una imágen

        // Limpieza
        canvas = null;
        context = null;

        // Regresamos la fotografía
        return this.foto;

    }

}