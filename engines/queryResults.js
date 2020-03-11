const { app } = require('electron');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

//importa el modelo de libro
const Book = sequelize.import(__dirname + '\\..\\models\\BookModel');

function getQuery()
{
    var page = getPage(); //llama a getPage
    //crea la paginacion
    var filter = 
    {
        offset: page * 5,
        limit: page * 5 + 5
    }

    //realiza las busquedas
    //falta agregar los filtros
    var Books = Book.findAll(filter);
    Books.then( //una vez los encuentrellama a createReg
        books =>
        {
            for(var i=0; i < books.length; i++)
            {
                createReg(  books[i].idBook, 
                            books[i].titulo, 
                            books[i].autor,
                            books[i].anio,
                            books[i].genero,
                            books[i].editorial,
                            books[i].contenido,
                            books[i].disponible);
            }
        }
    )
    erasePaginationElements(page); 
}


//crea un objeto DOM en la pagina, el cual es el registro de los libros que se buscan en la base de  datos
function createReg(_id, _titulo, _autor, _anio, _genero, _editorial, _contenido, _disponible)
{
    var results = document.getElementById("results"); //obtiene el lugar donde se colocaran las consultas


    var div = document.createElement("div"); //crea una division
    div.addEventListener("click", function(){redirectTo(_id)}, false); //agrega un listener a cada elemento DOM
    results.appendChild(div); //coloca la division dentro del link

    var h3 = document.createElement("h1"); //crea el titulo del libro
    div.appendChild(h3); //añade el titulo a la division
    var titulo = document.createTextNode(_titulo); //crea el titulo en base al reistro
    h3.appendChild(titulo); //añade la informacion al elemento h3

    var h4 = document.createElement("h3"); //crea el autor del libro
    div.appendChild(h4); //añade el autor a la division
    var autor = document.createTextNode(_autor); //cre el autor en base al registro
    h4.appendChild(autor); //añade la informacion al elemento h4

    var h5 = document.createElement("h5"); //crea la editorial del libro 
    div.appendChild(h5); //añade la editorial a la division
    var editorial = document.createTextNode(_editorial); //crea la editorial en base al registro
    h5.appendChild(editorial); //añade la informacion al elemento h6

    var h6 = document.createElement("h6"); //crea el año del libro
    div.appendChild(h6); //añade el año a la division
    var anio = document.createTextNode(_anio); //crea el anio en base al registro
    h6.appendChild(anio); //añade la informacion al elemento h6

    var h6ge = document.createElement("h6"); //crea el genero del libro
    div.appendChild(h6ge); //añade el genero del libro 
    var genero = document.createTextNode(_genero); //crea el genero al registro
    h6ge.appendChild(genero); //añade la informacion al elemento h6

}

function nextPage()
{
    var url = location.href.split("page="); //divide la url
    var page = parseInt(url[1]); //obtenemos el numero de pagina en que estamos actualmente
    page++; //aumenta la pagina
    location.href = url[0] + 'page=' + page; //cambia la url con los argumentos de proxima pagina
}

function previousPage()
{
    var url = location.href.split("page="); //divide la url
    var page = parseInt(url[1]); //obtenemos el numero de pagina en que estamos actualmente
    page--; //disminuye la pagina
    location.href = url[0] + 'page=' + page; //cambia la url con los argumentos de la anterio pagina
}

//funcion llamada cuando se hace click en un libro
function redirectTo(id) 
{
    var url = __dirname + "\\bookInformation.html" + "?id=" + id; //genera una url con args, el id del libro
    location.href = url; //cambia la direccion actual a la url creada
}

function getPage()
{ 
    var url = location.href.split("page="); //divide la url
    var page = parseInt(url[1]); //obtiene el valor de la pagina actual en basea la url
    var actualPage = document.getElementById("actualPage"); //obtiene el elemento donde se visualiza la pagina actual
    actualPage.value = ++page; //aumenta el valor de la pagina actual
    return actualPage.value - 1; //retorna el valor actual de la pagina
}

function erasePaginationElements(page)
{
    var results = document.getElementById("results"); //obtiene el elemento donde se colocan los registros de libros
    var pagination = document.getElementById("pagination"); //obtiene el elemento donde se viisualiza la paginacion
    var previous = document.getElementById("previous"); //obtiene el elemento para pasar a la pagina anterior
    var next = document.getElementById("next"); //obtiene el elemento paara pasar a la proxima pagina
    
    //si la pagina es menor o igual a 0, 
    if(page <= 0)
        pagination.removeChild(previous); //remueve el elemento boton previous
    //si el numero de elementos en resultados es menor a 5
    if(results.childNodes.length < 5)
        pagination.removeChild(next);//remueve el elemento boton next
    console.log(results.childNodes.length);
}