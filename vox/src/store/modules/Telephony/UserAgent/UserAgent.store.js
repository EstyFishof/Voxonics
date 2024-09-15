import * as JsSIP from 'jssip'

export const UserAgent = {
    state: {
        popup: null,
        phoneWindowMode: localStorage.getItem('phoneWindowMode') || 'contain',
        parentFrame: true,
        socketSIP: null,
        userAgent: null,
        statusCall: '',
        causeCall: '',
        localStream: null
    },
    actions: {
        createUserAgent({commit, dispatch}, payload) {
            const authName = payload.internalNumber.toString()
            const socket = new JsSIP.WebSocketInterface(window.env.SIP_TRANSPORT)
            const configuration = {
                sockets: [socket],
                uri: `sip:${authName}@${window.env.SIP_HOST}`,
                password: payload.secret,
                session_timers: false
            }
            const userAgent = new JsSIP.UA(configuration)
            commit('saveUserAgent', userAgent)
            dispatch('subscribeUserAgentEvents')
            dispatch('startConnectionSip')
        },
        subscribeUserAgentEvents({state, commit}) {
            state.userAgent.on('newRTCSession', ({session}) => {
                commit('addSession', session)
            })
            // state.userAgent.on('connecting', () => {
            //     console.log('connecting')
            // })
            // state.userAgent.on('disconnected', () => {
            //     console.log('disconnected')
            // })
            // state.userAgent.on('registered', (e) => {
            //     console.log('registered')
            // })
            // state.userAgent.on('unregistered', () => {
            //     console.log('unregistered')
            // })
            // state.userAgent.on('registrationFailed', () => {
            //     console.log('registrationFailed')
            // })
            
        },
        startConnectionSip({state}) {
            state.userAgent.start()
        },
        stopConnectionSip({state}) {
            state.userAgent.stop()
        },
        startRegister({state}) {
            state.userAgent.register()
        },
        unRegister({state}) {
            state.userAgent.unregister()
        },
        sipCall({state}, payload) {
            const target = `sip:${payload}@${window.env.SIP_HOST}`
            let isCall = true
            const options = {
                mediaStream: state.localStream,
            }
            if((payload.length === 4 && payload.slice(1) === state.userAgent.configuration.uri.user) || [...this.getters.notConfirmedSessions, ...this.getters.deferredSessions, this.getters.activeSession].filter(el => !!el).length >= 3) {
                isCall = false
            }
            isCall ? state.userAgent.call(target, options) : null
        },
    },
    mutations: {
        setStream(state, payload) {
            state.localStream = payload
        },
        setStatusCall(state, payload) {
            state.statusCall = payload
        },
        setCauseCall(state, payload) {
            state.causeCall = payload
        },
        saveUserAgent(state, payload) {
            state.userAgent = payload
        },
        savePopup(state, payload) {
            state.popup = payload
        },
        setParentFrame(state, payload) {
            state.parentFrame = payload
        },
        setPhoneWindowMode(state, payload) {
            state.phoneWindowMode = payload
        },

    },
    getters: {
        phoneWindowMode: state => state.phoneWindowMode,
        popup: state => state.popup,
        parentFrame: state => state.parentFrame,
        userAgent: state => state.userAgent,
        getLocalStreamMicrophone: state => state.localStream,
        isConnectedToSoftPhone: state => state.userAgent?.isConnected(),
        isRegisteredToSoftPhone: state => state.userAgent?.isRegistered()
    }
}


