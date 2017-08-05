"use strict"
const fs = require('fs')
const path = require('path')
const { app } = require('electron')

// 在appData下创建临时文件夹
const tempDir = 'electron_yebtemp'
const appData = path.join(app.getPath('appData'), tempDir)
try {
    let stat = fs.statSync(appData)
    if (stat.isFile()) {
        fs.unlinkSync(appData)
        throw new Error()
    }
} catch (e) {
    fs.mkdirSync(appData)
}

export default {
    appData,
    app: app.getAppPath(),
    home: app.getPath('home'),
    temp: app.getPath('temp')
}