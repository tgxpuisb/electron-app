"use strict"
const fs = require('fs')
const path = require('path')
const PSD = require('psd')
import upload from '../../library/upload'
const { ipcMain, app } = require('electron')

const appDataPath = app.getPath('appData')

ipcMain.on('UPLOAD_PUZZLE_PSD_FILE', (event, data) => {
    let psd = PSD.fromFile(data.filePath)
    psd.parse()
    psd.image.saveAsPng(appDataPath + '/test.png').then(() => {
        upload(appDataPath + '/test.png').then(url => {
            console.log(url)
            event.sender.send('PUZZLE_PSD_FILE_COMPLETE', url)
        }).catch(e => console.log(e))
    })

    // upload(psd.image.toPng()).then(url => {console.log(url)}).catch(e => console.log(e))

})