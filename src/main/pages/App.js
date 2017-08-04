"use strict"

const { ipcMain, app } = require('electron')

ipcMain.on('ASK_APP_PATH_TO_MAIN_PROCESS', (event) => {
    event.sender.send('GET_APP_PATH_FROM_MAIN_PROCESS', {
        app: app.getAppPath(),
        home: app.getPath('home'),
        appData: app.getPath('appData'),
        temp: app.getPath('temp')
    })
})