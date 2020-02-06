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
    var results = document.getElementById("results");
    window.alert("");
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
            }
        }
    )
}