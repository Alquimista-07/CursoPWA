// Clase que contiene la lógica para inicializar la cámara
// Usando Ecmacscript 6

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

    }

}