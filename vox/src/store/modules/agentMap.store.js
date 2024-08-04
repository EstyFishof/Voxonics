import { AgentMapWs } from '@/API/websocket'
import { UserDashboard } from '@/store/modules/UserDashboard'
import { AgentMapEffectsApi, UsersEffectsApi } from '@/API/effects'
import { allowedStatuses } from './UserDashboard'

const computedTime = time => {
    let seconds = Math.round((Date.now() - +sessionStorage.getItem('offsetTime') - +time) / 1000)
    if (seconds < 0) {
        seconds = 0
    }
    let minutes, days
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60)
        seconds = seconds % 60
        if (minutes >= 1440) {
            days = Math.floor(minutes / 1440)
            minutes = minutes % 1440
        }
    }
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    days = days < 10 ? `0${days}` : days
    if (!minutes) {
        minutes = '00'
    }
    return {days: days, time: `${minutes}m : ${seconds}s`}
}

export default {
    state: {
        usersAgentMap: [],
        socketAgentMap: null,
        timer: null
    },
    actions: {
        startConnectionAgentMap({dispatch, commit}) {
            const ws = AgentMapWs()
            ws.onopen = () => ws.onmessage = response => dispatch('handlerWsMap', JSON.parse(response.data))
            commit('setConnectionAgentMap', ws)
        },
        async handlerWsMap({dispatch}, payload) {
            if (payload.user !== undefined) {
                await dispatch('onUserMap', payload)
            }
            if (payload.event !== undefined) {
                dispatch('onEventMap', payload)
            }
            if (payload.error !== undefined) {
                dispatch('pushLogout')
                dispatch('emitError', payload.details.message)
            }
        },
        onUserMap({commit, state}, payload) {
            const users = []
            const lastIndex = Object.keys(payload.user).sort((a, b) => +a - +b).pop()
            for (let i = 0; i <= +lastIndex; i++) {
                const config = {
                    ...payload.user[i],
                    notUser: !payload.user[i],
                    placeInList: i
                }
                if (payload.user[i] && payload.user[i].statusTime) {
                    config.statusTime = Date.parse(payload.user[i].statusTime.split(' ').join('T'))
                }
                users.push({...new UserDashboard(config)})
            }
            commit('usersAgentMapMutation', users)
            state.timer = setInterval(() => commit('updateTimeDashboard'), 1000)
        },
        onEventMap({commit, state}, payload) {
            if (payload.event === 'ExtensionState') {
                // if (payload.data.statusText === 'hold') return
                const user = state.usersAgentMap.find(user => user.uid === payload.data.userUid)
                commit('userAgentMapMutation', {...new UserDashboard({...user, statusPhone: {...payload.data}, talkingTo: payload.data.option ? payload.data.option.phoneNumber || payload.data.option.externalNumber : null})})
            } else if (payload.event === 'UserStatus') {
                const user = state.usersAgentMap.find(user => user.uid === payload.data.userUid)
                commit('userAgentMapMutation', {
                    ...new UserDashboard({
                        ...user,
                        status: payload.data.statusText,
                        statusTime: payload.data.time
                    })
                })
            }
        },
        closeConnectionAgentMap({state}) {
            state.socketAgentMap.close()
            clearInterval(state.timer)
        },
        savePositionsOnDashboard(ctx, payload) {
            AgentMapEffectsApi.agentMapPreferences(payload)
        },
        userOnPauseEmit({commit, state}, payload) {
            UsersEffectsApi.pauseUser(payload)
                .then((res) => {
                    const user = state.usersAgentMap.find(user => user.uid === payload.uid)
                    commit('userAgentMapMutation', {...user, onPause: res.data.onPause})
                })
        },
        userLogoutEmit(ctx, payload) {
            UsersEffectsApi.logOutUser(payload)
        }
    },
    mutations: {
        addEmptySlot(state) {
            console.log("addEmptySlot");
            state.usersAgentMap.forEach(user => user.placeInList++)
            state.usersAgentMap = [{...new UserDashboard({notUser: true, placeInList: 0})}, ...state.usersAgentMap]
        },
        usersAgentMapMutation(state, payload) {
            state.usersAgentMap = [...state.usersAgentMap, ...payload]
        },
        usersAgentMapCreate(state, payload) {
            state.usersAgentMap = [...payload]
        },
        userAgentMapMutation(state, payload) {
            const userIndex = state.usersAgentMap.findIndex(user => user.uid === payload.uid)
            state.usersAgentMap[userIndex] = payload
        },
        userAgentMapDelete(state, payload) {
            console.log("userAgentMapDelete");
            const userIndex = state.usersAgentMap.findIndex(user => user.placeInList === payload.placeInList)
            state.usersAgentMap.splice(userIndex, 1)
        },
        setConnectionAgentMap(state, payload) {
            state.socketAgentMap = payload
        },
        resetAgentMap(state) {
            state.usersAgentMap = []
        },
        updateTimeDashboard(state) {

            for (let i = 0; i < state.usersAgentMap.length; i++) {
                if (!allowedStatuses.includes(state.usersAgentMap[i].status) && state.usersAgentMap[i].statusTime) {
                    const user = {
                        ...state.usersAgentMap[i],
                        timeToView: computedTime(state.usersAgentMap[i].statusTime)
                    }
                    state.usersAgentMap.splice(i, 1, user)
                } else if (state.usersAgentMap[i].statusPhone && state.usersAgentMap[i].statusPhone.time) {
                    if (!state.usersAgentMap[i].statusTime) {
                        const user = {
                            ...state.usersAgentMap[i],
                            timeToView: {
                                days: null,
                                time: 'New user'
                            }
                        }
                        state.usersAgentMap.splice(i, 1, user)
                        continue
                    }
                    if (state.usersAgentMap[i].status === 'onpause'
                        || state.usersAgentMap[i].status === 'paused'
                        && state.usersAgentMap[i].statusPhone.statusText === 'online') {
                        const user = {
                            ...state.usersAgentMap[i],
                            timeToView: computedTime(state.usersAgentMap[i].statusTime)
                        }
                        state.usersAgentMap.splice(i, 1, user)
                    } else {
                        const user = {
                            ...state.usersAgentMap[i],
                            timeToView: computedTime(state.usersAgentMap[i].statusPhone.time)
                        }
                        state.usersAgentMap.splice(i, 1, user)
                    }

                }
            }
        }
    },
    getters: {
        usersAgentMap: state => state.usersAgentMap
    }
}
