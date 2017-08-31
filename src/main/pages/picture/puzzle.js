"use strict"
const fs = require('fs')
const path = require('path')
const PSD = require('psd')
const co = require('co')
import upload from '../../library/upload'
const { ipcMain, app } = require('electron')

const appDataPath = app.getPath('appData')

ipcMain.on('UPLOAD_PUZZLE_PSD_FILE', (event, data) => {

    event.sender.send('PUZZLE_PSD_FILE_START', {})

    co(function* () {
        try {
            const tree = getPSDTree(data.filePath)
            const treeData = tree.export()
            console.log(treeData)
            let puzzles = []
            const puzzlesData = treeData.children.filter(v => {
                return v.type === 'group'
            })

            for (let index = 0; index < puzzlesData.length; index++) {
                const value = puzzlesData[index]

                event.sender.send('PUZZLE_PSD_FILE_PROCESS', {
                    complete: index,
                    total: puzzlesData.length
                })

                // thumb
                const thumbTmpPath = path.join(appDataPath, `thumb-${index}.png`)
                yield saveAsPng(tree.childrenAtPath(`${value.name}/thumb`)[0], thumbTmpPath)
                const thumb = yield upload(thumbTmpPath)

                // cover(background)
                const backgroundTmpPath = path.join(appDataPath, `background-${index}.png`)
                yield saveAsPng(tree.childrenAtPath(`${value.name}/cover`)[0], backgroundTmpPath)
                const background = yield upload(backgroundTmpPath)

                const pieces = value.children[2].children.map(({
                    bottom,
                    left,
                    top,
                    right
                }) => {
                    return {bottom, left, top, right}
                })

                puzzles.push({
                    thumb_img: thumb,
                    background_img: background,
                    pieces,
                    pic_count: pieces.length,
                    width: value.width,
                    height: value.height
                })
            }

            event.sender.send('PUZZLE_PSD_FILE_COMPLETE', puzzles)

        } catch (err) {
            console.log(err)
            event.sender.send('PUZZLE_PSD_FILE_ERROR', err)
        }
    })
})

function getPSDTree (path) {
    const psd = PSD.fromFile(path)
    psd.parse()
    return psd.tree()
}

function saveAsPng (layer, savePath) {
    return new Promise((resolve, reject) => {
        layer
            .saveAsPng(savePath)
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

