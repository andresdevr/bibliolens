const { app } = require('electron');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

function createDb()
{
    //prueba de conexion
    sequelize.authenticate()
    .then( () =>
    {
        //creacion de los modelos que previamente seran traducidos a SQL como tablas con sus atributos
        var Book = sequelize.define('Book', //tabla Book
        {
            //atributos de Book
            id:
            {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            titulo:
            {
                type: DataTypes.STRING,
                allowNull: false
            },
            autor:
            {
                type: DataTypes.STRING,
                allowNull: true
            },
            anio:
            {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            genero:
            {
                type: DataTypes.STRING,
                allowNull: true
            },
            editorial:
            {
                type: DataTypes.STRING,
                allowNull: true
            },
            contenido:
            {
                type: DataTypes.TEXT,
                allowNull: true
            },
            disponible:
            {
                type: DataTypes.BOOLEAN
            }

            //fin de los atributos de Book
        });
        //definir mas Modelos debajo


        //fin de los modelos
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

