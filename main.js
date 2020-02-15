const { app, BrowserWindow } = require('electron')
const fs = require('fs');
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
    )

    win.on('closed', () =>
    {
        fs.unlink('./engines/OCR/image.png', function(){});
    });

    // y carga la configuracion de la Db de la aplicación.
    win.loadFile('views/addBook.html')
  
}

app.on('ready', createWindow)
