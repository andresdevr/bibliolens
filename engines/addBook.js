const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);


function getData()
{
    var data = document.forms["registro"];
    var titulo = data["titulo"].value;
    var autor = data["autor"].value;
    var anio = data["anio"].value;
    var genero = data["genero"].value;
    var editorial = data["editorial"].value;
    var cantidad = data["cantidad"].value;

    

}


