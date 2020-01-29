const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

var inputs = new Array();

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

function addInput()
{
    var libros = document.forms["registro"].elements["cantidad"].value;
    var parent = document.getElementById("ids");

    while(parent.firstChild)
        parent.removeChild(parent.firstChild);

    for (var i=0; i < libros; i++)
    {
        inputs.push(document.createElement("input"));
        inputs[i].type = "text";
        inputs[i].placeholder = "id " + (i + 1);
        parent.appendChild(inputs[i]);
    }

}

