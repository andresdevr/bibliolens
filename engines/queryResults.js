const { app } = require('electron');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

//cambiar en un futuro para la reutilizacion de codigo
var Book = sequelize.define('Book', //tabla Book
{
    //atributos de Book
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    titulo:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor:
    {
        type: DataTypes.STRING,
        allowNull: true
    },
    anio:
    {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    genero:
    {
        type: DataTypes.STRING,
        allowNull: true
    },
    editorial:
    {
        type: DataTypes.STRING,
        allowNull: true
    },
    contenido:
    {
        type: DataTypes.TEXT,
        allowNull: true
    },
    disponible:
    {
        type: DataTypes.BOOLEAN
    }

    //fin de los atributos de Book
});


function getQuery()
{
    var Books = Book.findAll();
    Books.then(
        books =>
        {
            for(var i=0; i < books.length; i++)
            {
                console.log("id: " + books[i].id +
                            " titulo: " + books[i].titulo +
                            " autor: " + books[i].autor +
                            " anio: " + books[i].anio +
                            " genero: " + books[i].genero +
                            " editorial: " + books[i].editorial +
                            " contenido: " + books[i].contenido +
                            " diponible: " + books[i].disponible);

                createReg(  books[i].id, 
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
}

function createReg(_id, _titulo, _autor, _anio, _genero, _editorial, _contenido, _disponible)
{
    var results = document.getElementById("results"); //obtiene el lugar donde se colocaran las consultas

    var register = document.createElement("a"); //crea un link al elemento
    results.appendChild(register); //añade como hijo a results

    var div = document.createElement("div"); //crea una division
    register.appendChild(div); //coloca la division dentro del link

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