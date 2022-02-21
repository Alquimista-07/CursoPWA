// Forma de confirmar si podemos utilizar el Service Worker en el navegador
/*
if('serviceWorker' in navigator){
    console.log('Podemos Usarlo');
}
*/

// Otra forma de confirmar si podemos utilizar el service worker en el navegador
if(navigator.serviceWorker){
    console.log('Podemos usar el Service Worker (SW)');
}