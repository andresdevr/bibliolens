const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

const Book = sequelize.import('BookModel');
const User = sequelize.import('UserModel');

module.exports = (sequelize, DataTypes) =>
{
    class Loan extends Model { }

    Loan.init
    (
        {
            //atributos de Loan
            idLoan:
            {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
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
                    model: Book,
                    key: 'idBook'
                }
            },
            idUser:
            {
                type:DataTypes.INTEGER,
                references:
                {
                    model: User,
                    key: 'idUser'
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
