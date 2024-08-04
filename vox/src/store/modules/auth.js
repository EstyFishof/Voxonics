import router from '../../router'
import {AuthApi} from '@/API/Auth.api'

export default {
    state: {
        authStatus: "",
        token: localStorage.getItem("token") || "",
        userInfo: null,
        roleAgent: undefined,
        viewCDR: null,
        billingCDR: null
    },
    actions: {
        sendReqLogin({commit}) {
            commit("loadLogin")
        },
        logged({commit}) {
            commit("isLogin")
        },
        pushUserInfo(ctx, payload) {
            ctx.commit("writeUserInfo", payload)
            ctx.dispatch('createUserAgent', payload)
            if (!ctx.socket) {
                ctx.dispatch('startConnection')
            }
        },
        changeSelf({commit}, payload) {
            AuthApi.changeSelf(payload)
                .then(({data}) => commit('setUserInfoAuth', data))
        },
        pushLogout({commit, dispatch}) {
            AuthApi.logout().finally(() => {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token')
                }
                if (router.currentRoute.path !== '/') router.push('/')
                commit("logout")
                dispatch('stopConnectionSip')
            })
            commit("logout")
        },
        login({dispatch}, payload) {
            dispatch('sendReqLogin')
            AuthApi.login(payload).then((response) => {
                if (response?.data?.token) {
                    localStorage.setItem("token", response.data.token)
                    dispatch('logged')
                    router.push("/agent-panel")
                }
            })
        }
    },
    mutations: {
        loadLogin(state) {
            state.authStatus = "load"
        },
        isLogin(state, payload) {
            state.authStatus = "success"
            state.token = payload
        },
        logout(state) {
            state.userInfo = null
            state.authStatus = ""
            state.token = ""
        },
        writeUserInfo(state, payload) {
            state.roleAgent = payload.permission.role
            state.userInfo = payload
            state.viewCDR = payload.permission.cdr?.view
        },
        setUserInfoAuth(state, payload) {
            state.userInfo = payload
        }
    },
    getters: {
        authStatus: state => state.authStatus,
        getToken: state => state.token,
        userInfo: state => state.userInfo,
        userInfoViewCDR: state => state.viewCDR,
        userInfoComponent: state => state.userInfo,
        roleAgent: state => state.roleAgent
    }
}
