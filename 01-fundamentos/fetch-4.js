//Fetch Blob
// En este ejercicio vamos a usar fetch API para trabajar con una imágen

let img = document.querySelector('img');

//Leemos la imágen como un blob y la colocaremos como el source de una imágen manualmente
fetch('superman.png')
//    .then(console.log);
    .then(resp => resp.blob())
    .then(imagen => {
        //console.log(imagen);
        var imgPath = URL.createObjectURL(imagen);
        img.src = imgPath;
    });