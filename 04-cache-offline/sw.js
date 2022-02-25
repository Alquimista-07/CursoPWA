//Detectamos cuando no tenemos una conexión o cuando la conexión falla
self.addEventListener("fetch", (event) => {
  /*
    const offlineResp = new Response(`
        Bienvenido a Mi Página Web.

        Disculpa, pero para usarla, necesitas conexión a internet
    `);
    */

  const offlineResp = new Response(`

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>

    </head>
    <body class="container p-3">

    <h1>Offline Mode</h1>

    </body>
    </html>

    `, {
        headers: {
            'Content-Type':'text/html'
        }
    });

  //Acá lo que se esta haciendo es que para cada petición fetch regrese exáctamente lo mismo que se esta pidiendo
  const resp = fetch(event.request).catch(() => offlineResp);

  event.respondWith(resp);
});
