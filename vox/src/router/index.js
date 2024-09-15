import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {routes} from '@/router/mainRoutes'


Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

routes.forEach(route => {
    router.addRoute(route)
})


router.beforeEach((to, from, next) => {
    if (from.path !== '/') {
        for (const abortController of store.getters.abortControllerPool) {
            abortController.abort()
            store.commit('removeAbortController', abortController)
            store.dispatch('setSpinner', false)
        }
    }
    if (to.path.split('/')?.[1] === 'admin') {
        store.commit('setCurrentRoutes', 'admin')
    } else {
        store.commit('setCurrentRoutes', 'client')
    }
    store.commit('setMeta', to.meta)
    if (to.path !== '/') {
        if (!store.getters.userInfo?.name) {
            store.dispatch('getUserInfo')
        }
    }
    if (to.path === '/' && localStorage.getItem('token')) {
        return next('/agent-panel')
    }

    if (localStorage.getItem('role') === 'agent' || localStorage.getItem('role') === undefined || localStorage.getItem('role') === null) {
        if (to.path !== '/agent-panel' && to.path !== '/phone' && to.path !== `/config/users/account-info/${store.getters.userInfo?.internalNumber}` && to.path !== '/') {
            return next('/agent-panel')
        }
    }

    if (to.redirectedFrom) {
        if (to.redirectedFrom === '/config' && from.path.indexOf('config') !== -1) {
            return next(false)
        }
    }
    let indexConfig = to.path.indexOf('config')
    let indexReports = to.path.indexOf('reports')
    if (indexConfig === 1) {
        store.dispatch('getIsPage', 'config')
        let arr = to.path.slice(indexConfig + 7).split('/')
        store.dispatch('getPath', arr)
        next()
    } else if (indexReports === 1) {
        store.dispatch('getIsPage', 'reports')
        let arr = to.path.slice(indexReports + 8).split('/')
        store.dispatch('getPath', arr)
        next()
    } else {
        store.dispatch('getIsPage', '')
        let arr = to.path.split('/')
        store.dispatch('getPath', arr)
    }
    next()
})
export default router
