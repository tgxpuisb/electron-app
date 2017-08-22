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
const ftp = require('ftp')
const co = require('co')
const { ipcMain } = require('electron')

const appData = appPath.appData

ipcMain.on('CUT_ALBUM_MUSIC', (event, data) => {

})
/*
const uploadBg = co.wrap(function* (bg, bIndex, gIndex) {
    let urlPath = path.join(appData, `bg-${gIndex}-${bIndex}.png`)
    yield saveAsPng(bg, urlPath)
    let url = yield upload(urlPath)
    console.log('bg',url)
    return yield Promise.resolve({
        z: bg.z,
        url
    })
})
const uploadEl = co.wrap(function* (element, eIndex, gIndex) {
    let urlPath = path.join(appData, `el-${gIndex}-${eIndex}.png`)
    yield saveAsPng(element, urlPath)
    let url = yield upload(urlPath)
    console.log('el', url)
    return yield Promise.resolve({
        w: element.get('width'),
        h: element.get('height'),
        x: element.get('left'),
        y: element.get('top'),
        ani: false,
        aniName: '',
        delay: 0,
        duration: 0,
        z: element.z,
        url
    })
})
const uploadPhoto = co.wrap(function* (photo, pIndex, gIndex) {
    let urlPath = path.join(appData, `photo-${gIndex}-${pIndex}.png`)
    yield saveAsPng(photo.childrenAtPath('photo')[0], urlPath)
    let url = yield upload(urlPath)
    console.log('photo', url)
    let maskPath = path.join(appData, `mask-${gIndex}-${pIndex}.png`)
    yield saveAsPng(photo.childrenAtPath('mask')[0], maskPath)
    let mask = yield upload(maskPath)
    console.log('mask', mask)
    return yield Promise.resolve({
        w: photo.get('width'),
        h: photo.get('height'),
        x: photo.get('left'),
        y: photo.get('top'),
        ani: false,
        aniName: '',
        delay: 0,
        duration: 0,
        type: 2,
        dx: 0,
        dy: 0,
        dw: photo.get('width'),
        dh: photo.get('height'),
        z: photo.z,
        url,
        mask
    })
})
const uploadOneGroup = co.wrap(function* (group, gIndex) {
    const elements = group.children()
    const len = elements.length
    elements.forEach((element, index) => {
        element.z = len - index
    })

    return yield Promise.resolve({
        bgs: yield elements.filter(
            v => v.get('name') === 'bg'
        ).map((bg, bIndex) => {
            return uploadBg(bg, bIndex, gIndex)
        }),
        elements: yield elements.filter(
            v => v.get('name') === 'el'
        ).map((element, eIndex) => {
            return uploadEl(element, eIndex, gIndex)
        }),
        photos: yield elements.filter(
            v => v.get('name') === 'photo'
        ).map((photo, pIndex) => {
            // albumData.count++
            return uploadPhoto(photo, pIndex, gIndex)
        })
    })
})
*/

ipcMain.on('UPLOAD_ALBUM_PSD_FILE', (event, data) => {
    const albumTree = getTree(data.filePath)

    // psd图层总张数
    const total = albumTree.descendants().filter(v => v.get('type') !== 'group').length

    const groups = albumTree.children().filter(group => {
        return group.get('type') === 'group'
    })
    var albumData = {
        count: 0,
        post: null,
        slides: null
    }

    co(function* () {
        // 我本来想写 yield groups.map(...return yeild group.children().map(....)..) 后来想想算了,代码是写给人看的,慢就慢点吧
        // 后来想想,速度才是最重要的
        /*
        // 这段代码存在性能问题,且查看co源代码之后发现无法优化,但是通过邮箱能够把它写得很优雅
        albumData.slides = yield groups.map((group, gIndex) => {
            return co(function* () {

                const elements = group.children()
                const len = elements.length
                elements.forEach((element, index) => {
                    element.z = len - index
                })

                return yield Promise.resolve({
                    bgs: yield elements.filter(
                        v => v.get('name') === 'bg'
                    ).map((bg, bIndex) => {
                        return co(function* () {
                            let urlPath = path.join(appData, `bg-${gIndex}-${bIndex}.png`)
                            yield saveAsPng(bg, urlPath)
                            let url = yield upload(urlPath)
                            console.log('bg',url)
                            return yield Promise.resolve({
                                z: bg.z,
                                url
                            })
                        })
                    }),
                    elements: yield elements.filter(
                        v => v.get('name') === 'el'
                    ).map((element, eIndex) => {
                        return co(function* () {
                            let urlPath = path.join(appData, `el-${gIndex}-${eIndex}.png`)
                            yield saveAsPng(element, urlPath)
                            let url = yield upload(urlPath)
                            console.log('el', url)
                            return yield Promise.resolve({
                                w: element.get('width'),
                                h: element.get('height'),
                                x: element.get('left'),
                                y: element.get('top'),
                                ani: false,
                                aniName: '',
                                delay: 0,
                                duration: 0,
                                z: element.z,
                                url
                            })
                        })
                    }),
                    photos: yield elements.filter(
                        v => v.get('name') === 'photo'
                    ).map((photo, pIndex) => {
                        albumData.count++
                        return co(function* () {
                            let urlPath = path.join(appData, `photo-${gIndex}-${pIndex}.png`)
                            yield saveAsPng(photo.childrenAtPath('photo')[0], urlPath)
                            let url = yield upload(urlPath)
                            console.log('photo', url)
                            let maskPath = path.join(appData, `mask-${gIndex}-${pIndex}.png`)
                            yield saveAsPng(photo.childrenAtPath('mask')[0], maskPath)
                            let mask = yield upload(maskPath)
                            console.log('mask', mask)
                            return yield Promise.resolve({
                                w: photo.get('width'),
                                h: photo.get('height'),
                                x: photo.get('left'),
                                y: photo.get('top'),
                                ani: false,
                                aniName: '',
                                delay: 0,
                                duration: 0,
                                type: 2,
                                dx: 0,
                                dy: 0,
                                dw: photo.get('width'),
                                dh: photo.get('height'),
                                z: photo.z,
                                url,
                                mask
                            })
                        })
                    })
                })
            })
        })

        const firstPhoto = albumData.slides[0].photos[0]
        albumData.post = {
            type: 1,
            dw: firstPhoto.w / 2,
            dh: firstPhoto.h / 2,
            dx: firstPhoto.x / 2,
            dy: firstPhoto.y / 2,
            color: ''
        }
        */


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
                console.log(url)
            }
            albumData.slides.push(slide)
        }

        event.sender.send('ALBUM_PSD_FILE_COMPLETE', albumData)
    }).catch(e => {
        console.log(e)
        event.sender.send('ALBUM_PSD_FILE_ERROR', e)
    })
})

ipcMain.on('UPLOAD_ALBUM_HOLLOW_POSTER', (event, data) => {
    upload(data.filePath)
        .then(url => {
            event.sender.send('UPLOAD_ALBUM_HOLLOW_POSTER_COMPLETE', {
                url: url
            })
        })
        .catch(e => {

        })
})