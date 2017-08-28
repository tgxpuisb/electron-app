import {app, BrowserWindow} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    // global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') //线上环境静态资源位置改了下
    global.__static = require('path').join(__dirname, '../../../app.asar.unpacked/dist/electron/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        useContentSize: true
    })

    mainWindow.loadURL(winURL)
    // 窗口最大化
    mainWindow.maximize()

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // 引用js
    require('./pages/index')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
