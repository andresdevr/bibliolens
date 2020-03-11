const { app } = require('electron');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

const Book = sequelize.import(__dirname + '\\..\\models\\BookModel');
const Inventory = sequelize.import(__dirname + '\\..\\models\\InventoryModel');
const User = sequelize.import(__dirname + '\\..\\models\\UserModel');
const Loan = sequelize.import(__dirname + '\\..\\models\\LoanModel');

function createDb()
{
    //crea las tablas asi como el archivo .sqlite
    Book.sync();
    User.sync();
    Inventory.sync();
    Loan.sync();
    location.href = __dirname + '/addBook.html';
}


