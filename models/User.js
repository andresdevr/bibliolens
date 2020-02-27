const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

class User extends { }

User.init
(
    {
        //atributos de User
        UserId:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Email:
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        Number:
        {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        Historial:
        {
            type: DataTypes.STRING,

        }
        
    }
)