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

var _inputs = new Array();

function getData()
{
    var data = document.forms["registro"]; //obtiene el formulario registro
    //del formulario obtiene la siguiente informacion
    var _titulo = data["titulo"].value; 
    var _autor = data["autor"].value;
    var _anio = data["anio"].value;
    var _genero = data["genero"].value;
    var _editorial = data["editorial"].value;
    var cantidad = data["cantidad"].value;

    




    //realiza un registro por cada libro(distitno ID)
    for (var i=0; i < cantidad; i++)
    {
        //imprime que datos se guardaran en la Db
        console.log("id: " + parseInt(_inputs[i].value) + 
                    " titulo: " + _titulo + 
                    " autor: " + _autor + 
                    " anio: " + parseInt(_anio) + 
                    " genero: " + _genero + 
                    " editorial: " + _editorial +
                    " contenido: " + null +
                    " disponible: " + true);

        Book.create //este metodo del modelo agregra registros a la Db
        (
            {
                //atributos del nuevo registro
                id: parseInt(_inputs[i].value), //de un string, convierte a integer
                titulo: _titulo,
                autor: _autor,
                anio: parseInt(_anio), //de un string, convierte a integer
                genero: _genero,
                editorial: _editorial,
                contenido: null, //este campo se llenara con script de python
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


function startCam() //cuando la pagina carga esta funcion es llamada
{
    WebCamera.attach('#cam'); //inserta la camara en el div con id=cam
    WebCamera.on('err', function() //en caso de no cargar la camara llama a esta funcion
    {
        window.alert("No se puede acceder a la camara, llamar a soporte"); //crea una alerta con ese mensaje
        location.href = "./index.html"; //cambia la pagina a mostrar
    });
    WebCamera.on('load', startReading); //si carga bien la camara llama a startReading

    console.log("start Cam called");
}

function startReading() //funcion que crea un itervalo de llamada a snap
{
    console.log("start reading called");
    setInterval(snap, 3000); //cada x segundos llama a la funcion snap
}

function snap()
{
    var image = document.getElementById('result'); //obtiene el elemento html mediante su id
    console.log("snap called");
    

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
                image.src = data.image;
                console.log(data.words);
            });
        }
    )
    
}