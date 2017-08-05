"use strict"
const { ipcMain } = require('electron')
import appPath from '../library/app-path'

ipcMain.on('ASK_APP_PATH_TO_MAIN_PROCESS', (event) => {
    event.sender.send('GET_APP_PATH_FROM_MAIN_PROCESS', appPath)
})

