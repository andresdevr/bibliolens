const { app } = require('electron');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

//importa los modelos creados en sequelize
const Book = sequelize.import(__dirname + '\\..\\models\\BookModel');
const Inventory = sequelize.import(__dirname + '\\..\\models\\InventoryModel');
const User = sequelize.import(__dirname + '\\..\\models\\UserModel');
const Loan = sequelize.import(__dirname + '\\..\\models\\LoanModel');

function createDb()
{
    //crea las tablas asi como el archivo .sqlite
    Book.sync(); sequelize.close();
    User.sync(); sequelize.close();
    Inventory.sync(); sequelize.close();
    Loan.sync(); sequelize.close();
    location.href = __dirname + '/index.html'; //redirige al index una vez todas las tablas se hayan sincronizado
}


