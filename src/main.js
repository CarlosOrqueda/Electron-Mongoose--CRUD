const { BrowserWindow, ipcMain } = require('electron')
const Task = require('./models/Task')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('src/index.html')
}

ipcMain.on('newTask', async (e, args) => {
    const newTask = new Task(args)
    const taskSaved = await newTask.save()
    e.reply('newTaskCreated', JSON.stringify(taskSaved))
})

ipcMain.on('getTasks', async (e, args) => {
    const tasks = await Task.find().lean()
    e.reply('tasks', JSON.stringify(tasks))
})

ipcMain.on('deleteTask', async (e, args) => {
    const taskDeleted = await Task.findByIdAndDelete(args).lean()
    e.reply('taskDeleted', JSON.stringify(taskDeleted))
})

ipcMain.on('updateTask', async (e, args) => {
    const taskUpdated = await Task.findByIdAndUpdate(args.updateTaskId, {name: args.name, description: args.description}, {new: true}).lean()
    e.reply('taskUpdated', JSON.stringify(taskUpdated))
})

module.exports = { createWindow }