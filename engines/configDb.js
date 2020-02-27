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
function createDb()
{
    //prueba de conexion
    sequelize.authenticate()
    .then( () =>
    {
        sequelize.sync(); //sincroniza la base de datos con los modelos creados

        //cuando termina de configurar la db, redirecciona al index.html
        document.location.href = __dirname + '\\index.html';
    })
    .catch(err => //en caso de no poder conectar con la Db ejecuta este codigo
    {
        console.error('Imposible conectar con la Base de Datos, llame a soporte');
        window.alert('Imposible conectar con la base de datos, llame a soporte');
        app.quit(); //cierra la aplicacion cuando ocurre un fallo de conexion
    });
}


