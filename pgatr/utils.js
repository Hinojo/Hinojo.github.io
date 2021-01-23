function degToRad (angle)
{
    return(angle*Math.PI/180);
}

var loadTextResource = function(url, callback)
{
    //Creamos request para poder pedir archivos
    var request = new XMLHttpRequest();
    //Pedimos archivos a la url provista.
    //Para evitar que navegadores como chrome o Firefox no carguen por cache los archivos
    // (y por tanto, a veces no recargar los shaders) podemos añadir al final de la url al hacer 
    // el open() lo que vemos abajo. No cambiara el objeto, pero sí la URL
    // lo que obligará a chrome a recargar el objeto.
    request.open('GET', url + '?do-not-cache=' + Math.random(), true);
    request.onload = function()
    {
        //buscamos que el codigo que devuelva el html esté 
        //en el rango correcto:
        //Rango 300: algo se ha movido de sitio (o por el estilo)
        //Rango 400 y 500: errores garrafales 
        if (request.status < 200 ||request.status > 299)
        {
            callback('Error: Estado HTTP: ' + request.status + 'en archivo: ' + url);
        }
        else // No es error, ÉXITO
        {
            callback(null, request.responseText);
        }
    };
    request.send();
};

var loadImage = function(url, callback)
{
    var image = new Image();
    image.onload = function()
    {
        image.src = url;
        callback(null, image);
    };
    
};

var loadJSONResource = function(url, callback)
{
    loadTextResource(url, function(err, result)
    {
        //si loadText devuelve error, seguimos la cadena de devolver error.
        if (err)
        {callback (err);}
        else
        {
            //Tipico try y catch por si el parse del json no funca.
            //Dada la naturaleza de try catch y javascript, es buena practica
            //hacerlo en una funcion lo más pequeña posible, dado que no es optimizable.
            try
            {
                callback(null, JSON.parse(result));
            }catch(e)
            {
                callback(e);
            }
        }

    });
};