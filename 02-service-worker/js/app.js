// Forma de confirmar si podemos utilizar el Service Worker en el navegador
/*
if('serviceWorker' in navigator){
    console.log('Podemos Usarlo');
}
*/

// Otra forma de confirmar si podemos utilizar el service worker en el navegador
if(navigator.serviceWorker){
    //console.log('Podemos usar el Service Worker (SW)');

    // Instrucción para instalar el Service Worker (SW)
    // NOTA: Por lo general el SW siempre se ubica en la raiz de la app web, es decir, en el mismo nivel donde este el index.html.
    //       Esto es porque si el SW lo dejamos dentro de una carpeta el SW por defecto va a controlar esa carpeta y solo tendría acceso a esa carpeta en la que
    //       lo tenemos y lo que nosotros queremos es que nuesto SW tenga control total y absoluto de nuestra aplicación, por esa razón la dejamos a nivel del index.html  
    navigator.serviceWorker.register('/Sw.js');

}