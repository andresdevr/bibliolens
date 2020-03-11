const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

const Book = sequelize.import('BookModel');

module.exports = (sequelize, DataTypes) =>
{
    class Inventory extends Model { }

    Inventory.init
    (
        {
            //atributos de Inventory
            idBook:
            {
                type: DataTypes.INTEGER,
                references: 
                {
                    model: Book,
                    key: 'id'
                }
            },
            disponible:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
            //fin de los atributos de Inventory
        },
        {
            sequelize
        }
    )
    return Inventory;
}