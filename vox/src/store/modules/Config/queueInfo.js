import _ from 'lodash'
import { CreateQueueParse } from '@/lib/parse.queues'
import QueueAPI from "@/API/effects/Queues.api"

export default {
    state: {
        queue: {
            name: '',
            strategy: '',
            timeout: '',
            ringinuse: '',
            maxwait: '',
            relatedWith: [],
            belongTo: []
        },
        delete: false,
        initialQueue: null

    },
    actions: {
        setQueueInfo({ commit }, queueProp) {
            let queue = JSON.parse(JSON.stringify(queueProp))
            queue.relatedWith.user = _.sortBy(queue.relatedWith.user, function(item) {
                return [item.option.position]
              })
            commit('queueInfoMutation', queue)
        },
        setInitialQueue({ commit }, queueProp) {
            let queue = JSON.parse(JSON.stringify(queueProp))
            queue.relatedWith.user = _.sortBy(queue.relatedWith.user, function(item) {
                return [item.option.position]
              })
            commit('initialQueueMutation', queue)
        },
        setQueueNameInfo({ commit }, name) {
            commit('queueNameInfoMutation', name)
        },
        setStrategyInfo({ commit }, strategy) {
            commit('strategyInfoMutaion', strategy)
        },
        setTimeoutInfo({ commit }, timeout) {
            commit('timeoutInfoMutation', timeout)
        },
        setRingInUseInfo({ commit }, ring)  {
            commit('ringInUseInfoMutation', ring)
        },
        setMaxWaitInfo({ commit }, maxWait) {
            commit('maxWaitInfoMutation', maxWait)
        },
        setAgentsQueueInfo({ commit }, agents) {
            commit('agentsQueueInfoMutation', agents)
        },
        setMagagersQueueInfo({ commit }, managers) {
            commit('managersQueueInfoMutation', managers)
        },
        setDeleteQueueInfo({ commit }, deleteQueue) {
            commit('deleteQueueInfoMutation', deleteQueue)
        },
        createQueue(store, payload) {
            const form = JSON.parse(JSON.stringify(payload))//избавляемся от обзерверов
            const queue = CreateQueueParse(form)
            QueueAPI.createQueue(queue)
              .then(() => store.dispatch('getUserInfo'))
        }
    },
    mutations: {
        queueInfoMutation(state, queueProp) {
            let queue = JSON.parse(JSON.stringify(queueProp))
            queue.belongTo.user ? queue.belongTo = queue.belongTo.user : null
            queue.relatedWith.user ? queue.relatedWith = queue.relatedWith.user : null
            state.queue = queue
        },
        initialQueueMutation(state, queueProp) {
            let queue = JSON.parse(JSON.stringify(queueProp))
            queue.belongTo.user ? queue.belongTo = queue.belongTo.user : null
            queue.relatedWith.user ? queue.relatedWith = queue.relatedWith.user : null
            state.initialQueue = queue
        },
        queueNameInfoMutation(state, name) {
            state.queue.name = name
        },
        strategyInfoMutaion(state, strategy) {
            state.queue.strategy = strategy
        },
        timeoutInfoMutation(state, timeout) {
            state.queue.timeout = timeout
        }, 
        ringInUseInfoMutation(state, ring) {
            state.queue.ringinuse = ring
        },
        maxWaitInfoMutation(state, maxWait) {
            state.queue.maxWait = maxWait
        },
        agentsQueueInfoMutation(state, agents) {
            state.queue.relatedWith = JSON.parse(JSON.stringify(agents))
        },
        managersQueueInfoMutation(state, managers) {
            state.queue.belongTo = managers
        },
        deleteQueueInfoMutation(state, deleteQueue) {
            state.delete = deleteQueue
        }
    },
    getters: {
        getQueueInfo: state => state.queue,
        getInitialQueue: state => state.initialQueue,
        getQueueNameInfo: state => state.queue.name,
        getStrategyInfo: state => state.queue.strategy,
        getTimeoutInfo: state => state.queue.timeout,
        getRingInUseInfo: state => state.queue.ringinuse,
        getMaxWaitInfo: state => state.queue.maxwait,
        getAgentsQueueInfo: state => state.queue.relatedWith,
        getManagersQueueInfo: state => state.queue.belongTo,
        getDeleteQueueInfo: state => state.delete,
        getAgentsLength: state => state.queue.relatedWith.user?.length
    }
}
