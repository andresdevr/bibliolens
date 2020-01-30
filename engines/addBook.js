const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

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

var _inputs = new Array();

function getData()
{
    var data = document.forms["registro"];
    var _titulo = data["titulo"].value;
    var _autor = data["autor"].value;
    var _anio = data["anio"].value;
    var _genero = data["genero"].value;
    var _editorial = data["editorial"].value;
    var cantidad = data["cantidad"].value;
    for (var i=0; i < cantidad; i++)
    {
        console.log("id: " + parseInt(_inputs[i].value) + 
                    " titulo: " + _titulo + 
                    " autor: " + _autor + 
                    " anio: " + parseInt(_anio) + 
                    " genero: " + _genero + 
                    " editorial: " + _editorial +
                    " contenido: " + null +
                    " disponible: " + true);
        Book.create
        (
            {
                id: parseInt(_inputs[i].value),
                titulo: _titulo,
                autor: _autor,
                anio: parseInt(_anio),
                genero: _genero,
                editorial: _editorial,
                contenido: null,
                disponible: true   
            }
        );

    }
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
        _inputs.push(document.createElement("input"));
        _inputs[i].type = "text"; //asigna el tipo de input text
        _inputs[i].placeholder = "id " + (i + 1); //colocal el placeholder al input
        _inputs[i].required = true; //indica como necesario el input
        parent.appendChild(_inputs[i]); //añade el modulo al archivo html

    }

}
