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
const Book = sequelize.import(__dirname + '\\..\\models\\BookModel');


function getDetails()
{
    var _id = parseInt(location.href.split("=")[1]);   //obtiene la url actual como string, divide el string
                                            //en el elemento '=' y asgina el segundo elemento a id, que es el arg y lo convierte a INT
    var book = Book.findOne //busca el libro en la Db
    (
        {
            where: //utiliza la clausula where para buscar por id
            {
                id: _id
            }
        }
    );
    book.then //accede a las porpiedades de nuestro objeto
    (
        b =>
        {
            //imprime todos los datos del libro
            console.log("id: " + b.id +
                            " titulo: " + b.titulo +
                            " autor: " + b.autor +
                            " anio: " + b.anio +
                            " genero: " + b.genero +
                            " editorial: " + b.editorial +
                            " contenido: " + b.contenido +
                            " diponible: " + b.disponible);
        }
    )
}