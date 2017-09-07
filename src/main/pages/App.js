"use strict"
const { ipcMain } = require('electron')
import appPath from '../library/app-path'
import {
    login
} from '../library/login'

ipcMain.on('ASK_APP_PATH_TO_MAIN_PROCESS', (event) => {
    event.sender.send('GET_APP_PATH_FROM_MAIN_PROCESS', appPath)
})

ipcMain.on('APP_LOGIN', (event) => {
    login().then((data) => {
        if (data.success && data.cookies) {
            event.sender.send('APP_LOGIN_SUCCESS', data)
        } else {
            event.sender.send('APP_LOGIN_FAIL', data)
        }
    }).catch((error) => {
        event.sender.send('APP_LOGIN_FAIL', error)
    })
})