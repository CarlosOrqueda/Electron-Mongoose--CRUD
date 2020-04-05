const { createWindow } = require('./main')
require('./database')
const { app } = require('electron')

app.whenReady().then(createWindow)
app.allowRendererProcessReuse = true