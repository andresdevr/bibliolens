const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite:../database/registers.sqlite');
const Book = require('../models/bookModel.js');


function getData()
{
    var data = document.forms["registro"];
    var titulo = data["titulo"].value;
    var autor = data["autor"].value;
    var anio = data["anio"].value;
    var genero = data["genero"].value;
    var editorial = data["editorial"].value;
    var cantidad = data["cantidad"].value;

    for (var i=0; i<cantidad; i++)
    {
        //crear registros
    }

    sequelize.authenticate();
    sequelize.sync();
    sequelize.close();


}


