/**
 * @author yizhi.li
 * @date 2017/8/8
 * @desc
 */
"use strict"
const fs = require('fs')
const path = require('path')
const PSD = require('psd')
const co = require('co')
const { ipcMain } = require('electron')

ipcMain.on('CUT_ALBUM_MUSIC', (event, data) => {

})

ipcMain.on('UPLOAD_ALBUM_PSD_FILE', (event, data) => {
    let psd = PSD.fromFile(data.filePath)
    psd.parse()
    let psdData = psd.tree().export()
    event.sender.send('ALBUM_PSD_FILE_COMPLETE', psdData)
})