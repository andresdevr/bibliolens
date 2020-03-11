const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

const Inventory = sequelize.import('InventoryModel');
const User = sequelize.import('UserModel');

module.exports = (sequelize, DataTypes) =>
{
    class Loan extends Model { }

    Loan.init
    (
        {
            //atributos de Loan
            tipoPrestamo:
            {
                type: DataTypes.STRING,
                allowNull: false
            },
            idBook:
            {
                type: DataTypes.INTEGER,
                references:
                {
                    model: Inventory,
                    key: 'id'
                }
            },
            idUser:
            {
                type:DataTypes.INTEGER,
                references:
                {
                    model: User,
                    key: 'id'
                }
            }
            //fin de los atributos de Loan
        },
        {
            sequelize
        }
    )
    return Loan;
}
