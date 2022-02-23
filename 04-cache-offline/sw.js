//Detectamos cuando no tenemos una conexión o cuando la conexión falla
self.addEventListener('fetch', event =>{

    const offlineResp = new Response(`
        Bienvenido a Mi Página Web.

        Disculpa, pero para usarla, necesitas conexión a internet
    `);

    //Acá lo que se esta haciendo es que para cada petición fetch regrese exáctamente lo mismo que se esta pidiendo
    const resp = fetch(event.request)
        .catch( () => offlineResp);

    event.respondWith(resp);

});