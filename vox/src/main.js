import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import InputFacade from 'vue-input-facade'
import VueObserveVisibility from 'vue-observe-visibility'
import VueTippy, {TippyComponent} from "vue-tippy"
import access from '@/lib/access.js'
import InterceptorDestroyMixin from './utils/mixins/interceptorDestroy.mixin'


Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(InputFacade)
Vue.use(VueObserveVisibility)
//тултипы))
Vue.use(VueTippy, {
    zIndex: 9999999,
})
Vue.use(access)
Vue.component("tippy", TippyComponent)
Vue.mixin(InterceptorDestroyMixin)

async function body_script() {
    if (process.env.VUE_APP_REMOTE_ADMIN_URL) {
        const scriptElement = document.createElement('script')
        scriptElement.setAttribute('src', process.env.VUE_APP_REMOTE_ADMIN_URL + '/remoteEntry.js')
        scriptElement.setAttribute('type', 'text/javascript')
        document.head.appendChild(scriptElement)
        if (router.currentRoute.fullPath.split('/')?.[1] === 'admin') {
            if (localStorage.getItem('X-Signature')) {
                const res = await import('admin/adminLogin')
                const response = await res.default.getSignature()
                localStorage.setItem('X-Signature', response.data['X-Signature'])
            }
            const data = await import('admin/adminRoutes')
            store.commit('setCurrentRoutes', 'admin')
            for (const route of data.routes) {
                router.addRoute(route)
            }
        }
    }
    if (window.env.LOG_LEVEL === 'production') {
        window.console.log = () => {}
    }
}

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        body_script()
    }
}).$mount('#app')
