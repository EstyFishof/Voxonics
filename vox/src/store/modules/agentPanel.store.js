import { AgentPanelEffectsApi } from '@/API/effects'
import { AgentPanelWs } from '../../API/websocket'
import { UserDashboard } from './UserDashboard'

export default {
    state: {
        userAgentPanel: {...new UserDashboard()},
        socket: null
    },
    actions: {
        startConnection({dispatch, commit}) {
            const ws = AgentPanelWs()
            ws.onopen = () => ws.onmessage = response => dispatch('handlerWs', JSON.parse(response.data))
            commit('setConnection', ws)
            this.commit('setTimeAgentPanel')
        },
        handlerWs({dispatch}, payload) {
            if (payload.user !== undefined) {
                dispatch('onUser', payload)
            }
            if (payload.event !== undefined) {
                dispatch('onEvent', payload)
            }
            if (payload.error !== undefined) {
                dispatch('pushLogout')
                dispatch('emitError', payload.details.message)
            }
        },
        onUser({commit, state}, payload) {
            const config = payload.user
            if (payload.user.statusTime) {
                config.statusTime = Date.parse(config.statusTime.split(' ').join('T'))
            }
            commit('userAgentPanelMutation', {...new UserDashboard(config)})
            commit('setColorAgentPanel', payload.user.status)
        },
        onEvent({commit, state}, payload) {
            const user = {...new UserDashboard({...state.userAgentPanel, statusPhone: {...payload.data}, talkingTo: payload.data.option ? payload.data.option.phoneNumber || payload.data.option.externalNumber : null})}
            commit('userAgentPanelMutation', user)
            commit('setColorAgentPanel', state.userAgentPanel.statusPhone.statusText)
        },
        switchPause({commit, state}) {
            AgentPanelEffectsApi.onPause().then(() => {
                commit('pauseAgentPanelMutation')
                commit('setColorAgentPanel', state.userAgentPanel.statusPhone.statusText)
            })
        },
        closeConnection({state}) {
            state.socket.close()
            this.commit('setClearTimerAgentPanel')
        }
    },
    mutations: {
        pauseAgentPanelMutation(state) {
            state.userAgentPanel.onPause = !state.userAgentPanel.onPause
            state.userAgentPanel.status = state.userAgentPanel.status === 'onpause' ? 'online' : 'onpause'
        },
        userAgentPanelMutation(state, payload) {
            state.userAgentPanel = {...state.userAgentPanel, ...payload}
        },
        setConnection(state, payload) {
            state.socket = payload
        },
    },
    getters: {
        userAgentPanel: state => state.userAgentPanel
    }
}
