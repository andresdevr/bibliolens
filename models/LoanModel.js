const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

class Loan extends { }

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
        Prestamo:
        {
            type: DataTypes.STRING,
            allowNull: false
        },

    }
)