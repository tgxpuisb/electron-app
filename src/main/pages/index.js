"use strict"

const files = require.context('.', true, /\.js$/)

files.keys().forEach(key => {
    if (key === './index.js') return
    files(key)
})