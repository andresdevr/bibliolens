const {PythonShell} = require("python-shell");
const WebCamera = require ("webcamjs");
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);


const Book = sequelize.import(__dirname + '\\..\\models\\BookModel');
const Inventory = sequelize.import(__dirname + '\\..\\models\\InventoryModel');

var _inputs = new Array();
var _interval;

function getData()
{
    clearInterval(_interval); //elimina el intervalo de llamada a funcion 
    WebCamera.reset(); //apaga la camara

    var data = document.forms["registro"]; //obtiene el formulario registro
    //del formulario obtiene la siguiente informacion
    var _titulo = data["titulo"].value; 
    var _autor = data["autor"].value;
    var _anio = data["anio"].value;
    var _genero = data["genero"].value;
    var _editorial = data["editorial"].value;
    var cantidad = data["cantidad"].value;
    var idNewBook;

    var newBook =
    {
        titulo: _titulo,
        autor: _autor,
        anio: parseInt(_anio),
        genero: _genero,
        editorial: _editorial,
        contenido: null
    };
    Book.create(newBook);
    
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
        _inputs[i].type = "number"; //asigna el tipo de input text
        _inputs[i].placeholder = "id " + (i + 1); //colocal el placeholder al input
        _inputs[i].required = true; //indica como necesario el input
        parent.appendChild(_inputs[i]); //añade el modulo al archivo html

    }

}


function startCam() //cuando la pagina carga esta funcion es llamada
{
    WebCamera.attach('#cam'); //inserta la camara en el div con id=cam
    WebCamera.on('load', function()
    {
        _interval = setInterval(snap, 3000); //cada x segundos llama a la funcion snap

    }); //si carga bien la camara llama a startReading
}

function snap()
{
    var image = document.getElementById('result'); //obtiene el elemento html mediante su id
    WebCamera.snap( //metodo para capturar la imagen en formato uri
        function(uri) //recibe la informacion uri
        {
            const options = //opciones de configuracion para llamar archivos python
            {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: './engines/OCR',
                args: [uri]
            };

            var pythonCall = new PythonShell("ocr.py", options); //crea una instancia del script de python
            pythonCall.on("message", function(message) //realiza una llamada al script de python, la informacion que imprime python la recibe js mediante message
            {
                var data = JSON.parse(message);
                console.log(data.alert);
            });
        }
    )
    
}