const { app, BrowserWindow } = require('electron')
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

  // y carga la configuracion de la Db de la aplicación.
  win.loadFile('views/configDb.html')
  
}

app.on('ready', createWindow)
