/**
 * @author yizhi.li
 * @date 2017/8/8
 * @desc
 */
"use strict"

import {
    getTree,
    saveAsPng
} from '../../library/psd'
import upload from '../../library/upload'

import appPath from '../../library/app-path'

const fs = require('fs')
const path = require('path')
const co = require('co')
const { ipcMain } = require('electron')

const appData = appPath.appData

ipcMain.on('CUT_ALBUM_MUSIC', (event, data) => {

})

ipcMain.on('UPLOAD_ALBUM_PSD_FILE', (event, data) => {
    const albumTree = getTree(data.filePath)
    const groups = albumTree.children().filter(group => {
        return group.get('type') === 'group'
    })
    var albumData = {
        count: 0,
        post: null,
        slides: []
    }

    co(function* () {
        // 我本来想写 yield groups.map(...return yeild group.children().map(....)..) 后来想想算了,代码是写给人看的,慢就慢点吧
        for (let i = 0; i < groups.length; i++) {
            let slide = {
                bgs: [],
                elements: [],
                photos: []
            }
            let group = groups[i]
            let elements = group.children()

            for (let j = 0; j < elements.length; j++) {
                let element = elements[j]
                let name = element.get('name')

                let bg = {
                    z: elements.length - j
                }

                let el = {
                    w: element.get('width'),
                    h: element.get('height'),
                    x: element.get('left'),
                    y: element.get('top'),
                    ani: false,
                    aniName: '',
                    delay: 0,
                    duration: 0
                }

                let photo = {
                    type: 2,
                    dx: 0,
                    dy: 0,
                    dw: element.get('width'),
                    dh: element.get('height')
                }

                let urlPath = '', url = '', maskPath = '', mask = ''

                switch (name) {
                    case 'el':
                        urlPath = path.join(appData, `${i}-${name}-${j}.png`)
                        yield saveAsPng(element, urlPath)
                        url = yield upload(urlPath)
                        slide.elements.push({
                            ...bg,
                            ...el,
                            url
                        })
                        break
                    case 'photo':
                        urlPath = path.join(appData, `${i}-${name}-${j}.png`)
                        yield saveAsPng(element.childrenAtPath('photo')[0], urlPath)
                        url = yield upload(urlPath)
                        maskPath = path.join(appData, `${i}-mask-${i}.png`)
                        yield saveAsPng(element.childrenAtPath('mask')[0], maskPath)
                        mask = yield upload(maskPath)
                        slide.photos.push({
                            ...bg,
                            ...el,
                            ...photo,
                            url,
                            mask
                        })
                        albumData.count++ // 每处理完成一张photo此处都会自增

                        if (i === 0) {
                            // 对于第一张photo需要生成封面数据
                            albumData.post = {
                                type: 1,
                                dw: el.w / 2,
                                dh: el.h / 2,
                                dx: el.x / 2,
                                dy: el.y / 2,
                                color: ''
                            }
                        }

                        break
                    case 'bg':
                        urlPath = path.join(appData, `${i}-${name}-${j}.png`)
                        yield saveAsPng(element, urlPath)
                        url = yield upload(urlPath)
                        slide.bgs.push({
                            ...bg,
                            url
                        })
                        break
                }
            }
            albumData.slides.push(slide)
        }

        event.sender.send('ALBUM_PSD_FILE_COMPLETE', albumData)
    }).catch(e => {
        console.log(e)
        event.sender.send('ALBUM_PSD_FILE_ERROR', e)
    })
})