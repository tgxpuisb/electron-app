"use strict"

import {
    ipcRenderer
} from 'electron'

const state = {
    path: null
}

const mutations = {
    SET_APP_PATH (state, data) {
        state.path = data
    }
}

const actions = {
    getAppPath ({ commit }) {
        ipcRenderer.once('GET_APP_PATH_FROM_MAIN_PROCESS', (event, data) => {
            commit('SET_APP_PATH', data)
        })
        ipcRenderer.send('ASK_APP_PATH_TO_MAIN_PROCESS')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
