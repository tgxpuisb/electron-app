"use strict"
const fs = require('fs')
const request = require('request')
import {
    UPLOAD_IMAGE_URL,
    getSign
} from '../config/image-sign'

export default function (filePath) {
    let formData = getSign()
    formData.file = {
        value: fs.createReadStream(filePath),
        options: {
            filename: filePath.replace(/.+\//g, ''),
            contentType: 'image/png'
        }
    }
    return new Promise((resolve, reject) => {
        request.post({
            formData,
            url: UPLOAD_IMAGE_URL,
            json: true
        }, (err, httpResponse, body) => {
            if (err) {
                reject(err)
            } else {
                if (body.result) {
                    resolve(body.result)
                } else {
                    console.log('upload image error')
                    reject(body)
                }
            }
        })
    })
}