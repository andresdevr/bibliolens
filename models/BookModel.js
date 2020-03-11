const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);


module.exports = (sequelize, DataTypes) =>
{
    class Book extends Model { }

    Book.init
    (
        {
            //atributos de Book
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
            }
            //fin de los atributos de Book
        },
        {
            sequelize
        }
    )
    return Book;
}