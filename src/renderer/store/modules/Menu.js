"use strict"
const state = {
    userName: 'yizhi.li',
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
                }
            ]
        },
        {
            title: '施工中',
            path: {}
        }
    ],
    nav: [
        {
            title: '施工中',
            path: '#'
        },
        {
            title: '施工中',
            icon: 'el-icon-message',
            sub: [
                {
                    title: '施工中',
                    icon: 'el-icon-message',
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

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
