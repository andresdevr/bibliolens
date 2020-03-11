const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize
(
    {
        dialect: 'sqlite',
        storage: __dirname + '\\..\\database\\database.sqlite'
    }
);

function createWindow () 
{
    // Crea la ventana del navegador.
    let win = new BrowserWindow
    (
        {
            width: 1000,
            height: 800,
            webPreferences: 
            {
                nodeIntegration: true
            }
        }
    );

    win.on('closed', () =>
    {
        sequelize.close();
    });

    // y carga la configuracion de la Db de la aplicación.
    win.loadFile('views/configDb.html');
  
}

app.on('ready', createWindow);
