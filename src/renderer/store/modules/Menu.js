"use strict"
import {
    ipcRenderer
} from 'electron'

const state = {
    userName: '未登录',
    userAvatar: 'http://h0.hucdn.com/open/201724/21d777a959c51877_225x225.png',
    menus: [
        {
            title: '玩图模板',
            icon: 'el-icon-picture',
            sub: [
                {
                    title: '拼图模板生成',
                    path: {name: 'picture-puzzle'}
                },
                {
                    title: '影集模板生成',
                    path: {name: 'picture-album'}
                },
                {
                    title: '表情包模板生成',
                    path: {name: 'picture-album'}
                },
                {
                    title: '贝贝小程序影集生成',
                    path: {
                        name: 'picture-bbalbum'
                    }
                }
            ]
        },
        {
            title: '音乐相册',
            sub: [
                {
                    title: '列表',
                    path: {name: 'music_album-index'}
                }
            ]
        }
    ],
    nav: [
        {
            title: '施工中',
            path: '#'
        },
        {
            title: '小工具',
            icon: 'fa fa-wrench',
            sub: [
                {
                    title: '音乐上传',
                    icon: 'fa fa-music',
                    path: '#'
                },
                {
                    title: '施工中',
                    icon: 'el-icon-message',
                    path: '#'
                }
            ]
        }
    ]
}

const mutations = {
    SET_USER_AVATAR (state, data) {
        state.userAvatar = data.userAvatar
    },
    SET_USERNAME (state, data) {
        state.userName = data.userName
    }
}

const actions = {
    login ({ commit }) {
        ipcRenderer.once('APP_LOGIN_SUCCESS', (event, data) => {
            //commit('SET_USERNAME', data.userName)
            //commit('SET_USER_AVATAR', data.userAvatar)
        })
        ipcRenderer.once('APP_LOGIN_FAIL', (event, data) => {

        })
        ipcRenderer.send('APP_LOGIN')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
