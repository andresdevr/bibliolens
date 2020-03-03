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
const User = sequelize.import(__dirname + '\\..\\models\\UserModel');
const Loan = sequelize.import(__dirname + '\\..\\models\\LoanModel');

function createDb()
{
    //crea las tablas asi como el archivo .sqlites
    Book.sync();
    User.sync();
    Loan.sync();
    location.href = __dirname + '/index.html';
}


