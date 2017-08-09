/**
 * @author yizhi.li
 * @date 2017/8/10
 * @desc
 */
"use strict"

const fs = require('fs')
const PSD = require('psd')
const path = require('path')
const co = require('co')
const uploadImage = require('../upload-image.js')

const psd = PSD.fromFile('./album.psd')
psd.parse()

const tree = psd.tree()
const treeData = tree.export()

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

const albumData = treeData.children.filter(v => {
    return v.type === 'group'
}).map(v => {
    return {
        type: v.type,
        name: v.name,
        children: v.children.map(v1 => {
            let obj = {
                type: v1.type,
                name: v1.name,
                left: v1.left,
                top: v1.top,
                width: v1.width,
                height: v1.height
            }
            if (v1.children && Array.isArray(v1.children)) {
                obj.children = v1.children.map(v2 => {
                    return {
                        type: v2.type,
                        name: v2.name,
                        left: v2.left,
                        top: v2.top,
                        width: v2.width,
                        height: v2.height
                    }
                })
            }
            return obj
        })
    }
})

// 需要检查是否每张图片都是750x1206
const tempData = tree.descendants()[0].descendants()[0].export()
const groupTrees = tree.descendants()
co(function* () {
    for(let i = 0; i < albumData.length; i++) {
        let group = albumData[i]
        // let groupTreeLayers = groupTrees[0].descendants()
        let filePath = '../image_tmp/' + group.name + '/'

        for(let j = 0; j < group.children.length; j++) {

        }
    }
})

fs.writeFileSync('./temp.json', JSON.stringify(tempData, undefined, 4))

// 测试页面,  通过2小时的尝试,可以考虑使用 tree.descendants()来进行多层遍历


















