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
    class User extends Model { }

    User.init
    ( 
        {
            //atributos de User
            idUser:
            {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            email:
            {
                type: DataTypes.STRING,
                allowNull: true
            },
            numero:
            {
                type: DataTypes.NUMBER,
                allowNull: true
            },
            historial:
            {
                type: DataTypes.STRING,
                allowNull: true
            }
            //fin de los atributos  de User
        },
        {
            sequelize
        }
    )
    return User;
}
