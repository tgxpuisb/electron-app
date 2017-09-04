/**
 * @author yizhi.li
 * @date 2017/8/6
 * @desc
 */
"use strict"
import {
    LOGIN_URL,
    HEADERS,
    LOGIN_SUCCESS_URL
} from '../config/login-info'

const { BrowserWindow } = require('electron')

var win = null

var cookieString = ''

function cookieToString (cookies) {
    return cookies.reduce((prev, current) => {
        return prev + `${current.name}=${current.value};`
    }, '')
}

function initLoginWindow () {
    return new BrowserWindow({
        width: 800,
        height: 600,
        showDevTools: false,
        webPreferences: {
            javascript: false
        }
    })
}

export function isLogin () {
    return !!cookieString
}

export function forceLogin (callback) {
    if (win) {
        win.destroy && win.destroy()
    }

    win = initLoginWindow()

    win.loadURL(LOGIN_URL)
    const webContent = win.webContents

    const promise = new Promise((resolve, reject) => {
        win.on('closed', () => {
            win = null
            reject({
                error: 'closed'
            })
        })
        webContent.on('did-navigate', (event, url) => {
            if (url.indexOf(LOGIN_SUCCESS_URL) > -1) {
                webContent.session.cookies.get({
                    url: LOGIN_SUCCESS_URL
                }, (error, cookies) => {
                    if (error) {
                        return reject({
                            error
                        })
                    }
                    cookieString = cookieToString(cookies)
                    resolve({
                        success: true,
                        cookies: cookieString,
                        error: null
                    })
                    win.destroy()
                })
            }
        })
    })
    if (typeof callback === 'function') {
        promise
            .then(callback)
            .catch(callback)
    } else {
        return promise
    }
}

export function login (callback) {
    if (isLogin()) {
        const successInfo = {
            success: true,
            cookies: cookieString,
            error: null
        }
        if (typeof callback === 'function') {
            callback(successInfo)
        } else {
            return Promise.resolve(successInfo)
        }
    } else {
        return forceLogin(callback)
    }
}

export function getCookieString () {
    return cookieString
}