const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite:../database/registers.sqlite');


class Book extends Sequelize.Model {}

Book.init
(
    {
        nombre:
        {
            type: Sequelize.TEXT,
            allowNull: false
        },
        autor:
        {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        anio:
        {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate:
            {
                min: 1599
            }
        },
        genero:
        {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate:
            {
                inIn: [['epico', 'dramatico', 'didactico']]
            }
        },
        editorial:
        {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Book'
    }
);

module.exports.Book = Book;


//module.exports.nombrefncionvariableclase = fucnionvariableclase;