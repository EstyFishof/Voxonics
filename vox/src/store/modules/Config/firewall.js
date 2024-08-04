import _ from 'lodash'

export default {
    state: {
        list: [],
        initialList: []
    },
    actions: {
        setListFirewall({ commit }, payload) {
            commit('listFirewallMutation', payload)
        },
        setInitialListFirewall({ commit }, payload) {
            commit('initialListFirewallMutation', payload)
        },
        setSortListFirewall({ commit }, payload) {
            commit('sortListFirewallMutation', payload)
        },
        setAddNewFirewallIP({ commit }, payload) {
            commit('addNewFirewallIPMutation', payload)
        },
        setDeleteFirewallIP({ commit }, payload) {
            commit('deleteFirewallIPMutation', payload)
        },
        setUpdateFirewallIP({ commit }, payload) {
            commit('updateFirewallIPMutation', payload)
        }
    },
    mutations: {
        listFirewallMutation(state, payload) {
            const obj = _.groupBy(payload, item => {return item.ip})
            let array = []
            Object.values(obj).map(item => {
                // console.log(item)
                if(item.length === 1) {
                    array.push({...item[0], chain: [item[0].chain], uid: [item[0].uid]})
                } else {
                    array.push({...item[0], chain: ['voip_user', 'web_user'], uid: [item[0].uid, item[1].uid]})
                }
            })
            state.list = array
        },
        initialListFirewallMutation(state, payload) {
            const obj = _.groupBy(payload, item => {return item.ip})
            let array = []
            Object.values(obj).map(item => {
                if(item.length === 1) {
                    array.push({...item[0], chain: [item[0].chain], uid: [item[0].uid]})
                } else {
                    array.push({...item[0], chain: ['voip_user', 'web_user'], uid: [item[0].uid, item[1].uid]})
                }
            })
            state.initialList = array
        },
        sortListFirewallMutation(state, payload) {
            state[payload.identifier] = payload.value
        },
        addNewFirewallIPMutation(state, payload) {
            let flag = false
            state.list.map(item => {
                if(item.ip === payload.ip) {
                    item.chain.push(payload.chain)
                    item.uid.push(payload.uid)
                    item.chain = item.chain.sort()
                    flag = true
                }
            })

            

            state.initialList.map(item => {
                if(item.ip === payload.ip) {
                    item.chain.push(payload.chain)
                    item.uid.push(payload.uid)
                    item.chain = item.chain.sort()
                }
            })

            if(!flag) {
                state.list.unshift(JSON.parse(JSON.stringify({...payload, chain: [payload.chain], uid: [payload.uid]})))
                state.initialList.unshift(JSON.parse(JSON.stringify({...payload, chain: [payload.chain], uid: [payload.uid]})))
            }
        },
        deleteFirewallIPMutation(state, payload) {
            state.list = state.list.filter(item => {
                if(item.uid.indexOf(payload.uid[0]) !== -1 && item.uid.length < 2) return false
                else if(item.uid.indexOf(payload.uid[0]) !== -1 && item.uid.length === 2) {
                    item.uid = item.uid.filter(el => el !== payload.uid[0])
                    item.chain = item.chain.filter(el => el !== payload.chain[0])
                    return true
                } else return true
            })

            state.initialList = state.initialList.filter(item => {
                if(item.uid.indexOf(payload.uid[0]) !== -1 && item.uid.length < 2) return false
                else if(item.uid.indexOf(payload.uid[0]) !== -1 && item.uid.length === 2) {
                    item.uid = item.uid.filter(el => el !== payload.uid[0])
                    item.chain = item.chain.filter(el => el !== payload.chain[0])
                    return true
                } else return true
            })
        },
        updateFirewallIPMutation(state, payload) {
            state.list
                .map(element => {
                const index = element.uid.indexOf(payload.uid)
                if(index !== -1) {
                    element = JSON.parse(JSON.stringify({...payload, chain: [...element.chain.slice(0, index), payload.chain, ...element.chain.slice(index)], uid: [...element.uid.slice(0, index), payload.uid, ...element.uid.slice(index)]}))
                }
            })
            state.initialList.map(element => {
                const index = element.uid.indexOf(payload.uid)
                if(element.uid.indexOf(payload.uid) !== -1) {
                    element = JSON.parse(JSON.stringify({...payload, chain: [...element.chain.slice(0, index), payload.chain, ...element.chain.slice(index)], uid: [...element.uid.slice(0, index), payload.uid, ...element.uid.slice(index)]}))
                }
            })
        }
    },
    getters: {
        getListFirewall: state => state.list,
        getInitialListFirewall: state => state.initialList
    }
}
