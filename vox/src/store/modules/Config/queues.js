import QueueAPIEffects from '@/API/effects/Queues.api'

export default {
    state: {
        manage: [],
        initialManageQueuesList: []
    },
    actions: {
        setQueues({ commit }, payload) {
            commit('queuesMutation', payload)
        },
        setStrategy({ commit }, payload) {
            commit('strategyMutation', payload)
        },
        setTimeout({ commit }, payload) {
            commit('timeoutMutation', payload)
        },
        setRinginuse({ commit }, payload)  {
            commit('ringinuseMutation', payload)
        },
        updateQueuesInList({ commit }, payload) {
            return QueueAPIEffects.updateQueue(payload)
                .then(res => commit('updateQueuesInListMutation', res))
        },
        setWait({ commit }, payload) {
            commit('waitMutation', payload)
        }
    },
    mutations: {
        queuesMutation(state, list) {
            state.manage = list
            state.initialManageQueuesList = JSON.parse(JSON.stringify(list))
        },
        strategyMutation(state, payload) {
            state.manage.forEach(element => {
                if(element.uid === payload.uid) {
                    element.strategy = payload.value
                }
            })
        },
        timeoutMutation(state, payload) {
            state.manage.forEach(element => {
                if(element.uid === payload.uid) {
                    element.timeout = payload.value
                }
            })
        },
        ringinuseMutation(state, payload) {
            state.manage.forEach(element => {
                if(element.uid === payload.uid) {
                    element.ringinuse = payload.value
                }
            })
        },
        updateQueuesInListMutation(state, payload) {
            state.manage = state.manage.map(value => value.uid === payload.uid ? payload : value)
            state.initialManageQueuesList = state.initialManageQueuesList.map(value => value.uid === payload.uid ? payload : value)
        },
        waitMutation(state, payload) {
            state.manage.forEach(element => {
                if(element.uid === payload.uid) {
                    element.penaltymemberslimit = payload.value
                }
            })
        },
    },
    getters: {
        queuesListManage: state => state.manage,
        getInitialManageQueuesList: state => state.initialManageQueuesList
    }
}
