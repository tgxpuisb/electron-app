/**
 * @author yizhi.li
 * @date 2017/8/10
 * @desc
 */
"use strict"
const PSD = require('psd')

export function saveAsPng (layer, savePath) {
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

export function getTree (path) {
    const psd = PSD.fromFile(path)
    psd.parse()
    return psd.tree()
}