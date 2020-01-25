const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);



var Book = sequelize.define('Libro',
{
    titulo: Sequelize.STRING,
    autor: Sequelize.STRING,
    anio: Sequelize.INTEGER,
    genero: Sequelize.STRING,
    editorial: Sequelize.STRING
});



module.exports.Book = Book;