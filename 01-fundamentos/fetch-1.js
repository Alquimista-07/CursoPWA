// Pare que este ejercicio fetch funcione, necesitaremos trabajarlo en
// una página web (index.html)

// Explicación: Anteriormente para realizar algo parecido a un Fetch API este se hacía de una forma
// muy parecida a como se realizaba un call back(Ejercicio prom-1.js)
// Y para ello se realizaba de la siguiente manera:

var request = new XMLHttpRequest();

request.open('GET', 'https://reqres.in/api/users', true);
request.send(null);

// Validamos los cambios de estado del request
request.onreadystatechange = function(state){
    //console.log(request);
    if(request.readyState === 4){
        var respuesta = request.response;
        //Ahora lo que tenemos que hacer es transformar la respuesta en un objeto que me permita manejar la información
        var repespuetaObj = JSON.parse(respuesta);
        
        console.log(repespuetaObj);

        console.log(repespuetaObj.page, repespuetaObj.data);
        
    }
};


// Conclusion: Como se logra ver anteriormente para los estándares de JavaScript es mucho código para realizar una
// petición y para ello aparecio lo que es el Fetch API que se ve en la explicación del ejercicio fetch-2.js