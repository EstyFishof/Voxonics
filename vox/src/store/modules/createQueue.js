import { queue } from "../initial.state"

export default {
    state: {
        newQueue: queue,
    },
    actions: {
        setNameQueue({ commit }, name) {
            commit('nameMutation', name)
        },
        setInternalNumberQueue({ commit }, number) {
            commit('internalNumberMutation', number)
        },
        setStrategyQueue({ commit }, strategy) {
            commit('strategyMutation', strategy)
        },
        setTimeoutQueue({ commit }, timeout) {
            commit('timeoutMutation', timeout)
        },
        setRingQueue({ commit }, ring) {
            commit('ringMutation', ring)
        },
        setRelatedWithQueue({ commit }, agents) {
            commit('relatedWithMutation', agents)
        },
        setBelongToQueue({ commit }, managers) {
            commit('setBelongToMutation', managers)
        },
        resetCreateQueue({ commit }) {
            commit('clearQueue')
        }
    },
    mutations: {
        nameMutation(state, name) {
            state.newQueue.name = name
        },
        internalNumberMutation(state, number) {
            state.newQueue.internalNumber = number
        },
        strategyMutation(state, strategy) {
            state.newQueue.strategy = strategy
        },
        timeoutMutation(state, timeout) {
            state.newQueue.timeout = timeout
        },
        ringMutation(state, ring) {
            state.newQueue.ringinuse = ring
        },
        relatedWithMutation(state, agents) {
            state.newQueue.relatedWith = agents
        },
        setBelongToMutation(state, managers) {
            state.newQueue.belongTo = managers
        },
        clearQueue(state) {
            state.newQueue = {
                name: '',
                internalNumber: '',
                strategy: '',
                timeout: '',
                ringinuse: '',
                relatedWith: [],
                belongTo: []
            }
        }
    },
    getters: {
        newQueue: state => state.newQueue,
        newQueueName: state => state.newQueue.name,
        newQueueInternalNumber: state => state.newQueue.internalNumber,
        newQueueStrategy: state => state.newQueue.strategy,
        newQueueTimeout: state => state.newQueue.timeout,
        newQueueRing: state => state.newQueue.ringinuse,
        newQueueAgents: state => state.newQueue.relatedWith,
        newQueueManagers: state => state.newQueue.belongTo,
    }
}
