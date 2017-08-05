import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: require('@/pages/index')
        },
        {
            path: '/picture/puzzle',
            name: 'picture-puzzle',
            component: require('@/pages/picture/puzzle')
        },
        {
            path: '/picture/album',
            name: 'picture-album',
            component: require('@/pages/picture/album')
        }
    ]
})
