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
    var libros = document.forms["registro"].elements["cantidad"].value; //obtiene el total de libros a registrar
    var parent = document.getElementById("ids"); //obtiene el div padre que contendra los inputs, su id es ids

    while(parent.firstChild) //mientras tenga primer nodo hijo el div
        parent.removeChild(parent.firstChild); //remueve el primer nodo hijo del div 

    for (var i=0; i < libros; i++) //ciclo para añadir atributos a cada input
    {
        //aqui se crean los nodos
        inputs.push(document.createElement("input"));
        inputs[i].type = "text"; //asigna el tipo de input text
        inputs[i].placeholder = "id " + (i + 1); //colocal el placeholder al input
        inputs[i].required = true; //indica como necesario el input
        parent.appendChild(inputs[i]); //añade el modulo al archivo html

    }

}

