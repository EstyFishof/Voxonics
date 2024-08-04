import {
    addItemScen,
    changeScenarios,
    changeName,
    changeScenarioAfterUpdateParse,
    deleteBranch,
    parseScenarioToDisplay,
    parseScenariosToBackEnd,
    swapItems,
    deleteItem,
    sortedListOfScenariosByUid
} from '@/lib/parse.scenarios.js'
import {
    DialItem,
    QueueItem,
    VNumberItem,
    AnnouncementItem,
    WaitItem,
    IVRItem,
    HangupItem
} from '@/services/scenarios/scenariosItem.config'
import ScenarioGettersApi from '../../../API/getters/Scenario.api'
import {ScenarioEffectsApi} from '@/API/effects'
import {NumbersGettersApi} from '@/API/getters'
import { v4 as uuidv4 } from 'uuid'

export default {
    state: {
        initialList: [],
        listScenarios: [],
        scenario: null,
        initialScenario: {},
        showConfiguration: null,
        item: null,
        isSwappedMode: false,
        // changeMode: '',
        countries: [],
        numbersInvolved: [],
        sortedArrayOfUids: [],
        arrayUidsOfDeleteScenarios: [],
        arrayOfScenariosWithChangedName: []
    },
    actions: {
        setListScenarios(store) {
            const {commit, getters} = store
            return ScenarioGettersApi.getScenario()
                .then(res => {
                    commit('initialListMutation', sortedListOfScenariosByUid(JSON.parse(JSON.stringify(res.data.data)), getters.getSortedArrayOfUids))
                    commit('listScenariosMutation', sortedListOfScenariosByUid(res.data.data, getters.getSortedArrayOfUids))
                    commit('isSwappedModeMutation', false)
                    // commit('setItemMutation', null)
                })
        },
        deleteScenarios(store, listScenarios) {
            const listScenariosToDelete = JSON.parse(JSON.stringify(listScenarios))
            const {dispatch, commit} = store
            if (listScenariosToDelete.length) {
                dispatch('deleteScenario', listScenariosToDelete[0])
                    .then(() => {
                        listScenariosToDelete.shift()
                        commit('arrayUidsOfDeleteScenariosMutation', listScenariosToDelete)
                        dispatch('deleteScenarios', listScenariosToDelete)
                    })
            } else return
        },
        deleteScenario(store, payload) {
            if(payload === store.getters.getScenario?.uid) {
                store.commit('showConfigMutation', null)
                store.commit('scenarioMutation', null)
                store.commit('initialScenarioMutation', null)
            } 
            if(payload.split(' ')[0] === 'new') {
                return store.dispatch('localRemoveScenarioFromList', payload)
            }
            return ScenarioEffectsApi.deleteScenario(payload)
                .then(() => store.dispatch('setListScenarios'))
        },
        localRemoveScenarioFromList(store, uid) {
            const {getters, commit} = store
            const list = getters.getListScenarios.filter(el => el.uid !== uid)
            const initialList = getters.getInitialList.filter(el => el.uid !== uid)
            commit('initialListMutation', list)
            commit('listScenariosMutation', initialList)
            commit('isSwappedModeMutation', false)
        },
        createScenario(store, payload) {
            delete payload.uid
            ScenarioEffectsApi.createScenario(payload)
                .then(res => {
                    store.dispatch('setListScenarios')
                    store.dispatch('setScenario', res.data)
                    store.dispatch('setInitialScenario', res.data)
                    store.dispatch('setShowConfig', null)
                    store.commit('isSwappedModeMutation', false)
                })
        },
        updateScenario(store, payload) {
            return ScenarioEffectsApi.updateScenario(payload)
                .then(async (res) => {
                    const scenario = JSON.parse(JSON.stringify(res.data))
                    if(scenario) {
                        scenario.scenario.options.externalNumbers = await store.dispatch('getFullNumbersForScenario', scenario.scenario.options.externalNumbers)
                    }
                    store.dispatch('setListScenarios')
                    store.dispatch('setScenario', scenario)
                    store.dispatch('setInitialScenario', scenario)
                    store.dispatch('setShowConfig', null)
                    store.commit('changeScenarioAfterUpdate', scenario)
                    store.commit('isSwappedModeMutation', false)
                })
        },
        updateScenarioWithChangedName(store, listScenarios) {
            const {dispatch, commit} = store
            const listScenariosToUpdate = JSON.parse(JSON.stringify(listScenarios))
            if(listScenariosToUpdate.length) {
                return ScenarioEffectsApi.updateScenario(listScenariosToUpdate[0])
                    .then(() => {
                        listScenariosToUpdate.shift()
                        commit('arrayOfScenariosWithChangedNameMutation', listScenariosToUpdate)
                        dispatch('deleteScenarios', listScenariosToUpdate)
                    })
            }

            },
        async selectCurrentScenario({dispatch}, payload) {
            const scenario = JSON.parse(JSON.stringify(payload))
            if(scenario) {
                scenario.scenario.options.externalNumbers = await dispatch('getFullNumbersForScenario', scenario.scenario.options.externalNumbers)
            }
            // dispatch('setInvolvedNumbers')
            dispatch('setScenario', scenario)
            dispatch('setInitialScenario', JSON.parse(JSON.stringify(scenario)))
            dispatch('setShowConfig', null)
            dispatch('setItemScenario', null)
        },
        setInvolvedNumbers({commit}) {
            ScenarioGettersApi.getInvolvedNumbers()
                .then(res => commit('involvedNumbersMutation', res.data.usedExternalNumbers))
        },
        async getFullNumbersForScenario(store, externalNumbers) {
            if(!externalNumbers.length) return []
            const data = (await NumbersGettersApi.getFullNumbers(externalNumbers)).data.data   
            return data   
        },
        async setScenario({commit}, payload) {
            if(!payload) return commit('scenarioMutation', null)
            const data = JSON.parse(JSON.stringify(payload))
            
            const scenario = {...data, scenario: parseScenarioToDisplay(data.scenario)} 
            return commit('scenarioMutation', scenario)         
        },
        async setInitialScenario({commit}, payload) {
            if(!payload) return commit('initialScenarioMutation', null)   
            const data = JSON.parse(JSON.stringify(payload))

            const scenario = {...data, scenario: parseScenarioToDisplay(data.scenario)} 
            return commit('initialScenarioMutation', scenario)  
        },
        setCountriesScenario({ commit }, payload) {
            commit('countriesScenarioMutation', payload)
        },
        addItemScen(store, payload) {
            const {dispatch, commit} = store
            const obj = {
                category: uuidv4(),
                options: {},
                schema: '',
                next: []
            }
            commit('addItemScenMutation', {obj, item: payload})
            dispatch('setItemScenario', obj)
            dispatch('setShowConfig', '')
            commit('isSwappedModeMutation', false)
        },
        setShowConfig({ commit }, payload) {
            commit('showConfigMutation', payload)
        },
        setQueuesScenarios({ commit }, payload) {
            commit('queuesMutationScenarios', payload)
        },
        changeItemScenarios(store, payload) {
            const {getters} = store
            switch (payload.schema) {
                case 'hangup':
                    return HangupItem.getItem(payload, getters.getScenario.scenario)
                case 'dial':
                    return DialItem.getItem(payload, getters.getScenario.scenario)
                case 'queue':
                    return QueueItem.getItem(payload, getters.getScenario.scenario)  
                case 'vnumber-in':
                    return VNumberItem.getItem(payload, getters.getScenario.scenario)  
                case 'announcement':
                    return AnnouncementItem.getItem(payload, getters.getScenario.scenario)  
                case 'wait':
                    return WaitItem.getItem(payload, getters.getScenario.scenario)  
                case 'ivr':
                    return IVRItem.getItem(payload, getters.getScenario.scenario)              
                default:
                    break;
            }
        },
        async updateExistingScenarioItem(store, payload) {
            const {dispatch, commit} = store
            const item = await dispatch('changeItemScenarios', payload)
            commit('setItemMutation', item)
            commit('itemScenariosMutation', item)
        },
        async updateParentScenarioItem(store, payload) {
            const {dispatch, commit} = store
            const item = await dispatch('changeItemScenarios', payload)
            commit('itemScenariosMutation', item)
        },
        setItemScenario({ commit }, payload) {
            commit('setItemMutation', payload)
            commit('isSwappedModeMutation', false)
        },
        setNewScenario({ commit }, name) {
            const vNumberItem = {
                category: uuidv4(),
                options: {
                  externalNumbers: [],
                  name: null
                },
                next: [],
                schema: 'vnumber-in'
            }
            const scenario = {
                externalNumbers: [],
                uid: 'new ' + uuidv4(),
                path: `/${name}`,
                scenario: vNumberItem
            }
            commit('newScenarioMutation', scenario)
            commit('showConfigMutation', 'vnumber-in')
            commit('setItemMutation', vNumberItem)
            commit('isSwappedModeMutation', false)
        },
        copyScenario(store, payload) {
            const {dispatch, commit} = store
            const newScenario = JSON.parse(JSON.stringify(parseScenariosToBackEnd(payload)))

            newScenario.uid = 'new ' + uuidv4()
            newScenario.path = newScenario.path + ' copy'
            newScenario.externalNumbers = []
            newScenario.scenario.options.externalNumbers = []

            // console.log(JSON.parse(JSON.stringify(newScenario)))
            commit('newScenarioMutation', {...newScenario, scenario: parseScenarioToDisplay(newScenario.scenario)})
            commit('showConfigMutation', null)
            commit('setItemMutation', null)
            commit('isSwappedModeMutation', false)
            // dispatch('selectCurrentScenario', newScenario)
        },
        setChangeNameScenario(store, payload) {
            const {commit, getters, dispatch} = store
            const newData = changeName(getters.getListScenarios, getters.getScenario, payload)
            dispatch('setScenario', newData.currentScen)
            // dispatch('setInitialScenario', newData.currentScen)
            // commit('initialListMutation', newData.listScen)
            commit('listScenariosMutationAfterChangeName', newData.listScen)
        },
        changeNameOfScenarioAfterDrag(store, payload) {
            const {newName, scenario} = payload
            const {commit, getters, dispatch} = store
            const changedList = getters.getListScenarios.map(el => {
                if(el.uid === scenario.uid) {
                    el.path = newName
                }
                return el
            })
            const scenarioMutated = scenario.uid === getters.getScenario.uid ? {...getters.getScenario, path: newName} : scenario
            commit('scenarioMutation', scenarioMutated)  
            commit('listScenariosMutationWithObservers', changedList)
        },
        changeNameOfScenario(store, payload) {
            const {newName, scenario} = payload
            const {commit, getters, dispatch} = store
            const changedList = getters.getListScenarios.map(el => {
                if(el.uid === scenario.uid) {
                    el.path = newName
                }
                return el
            })
            commit('scenarioMutation', null)
            commit('initialScenarioMutation', null)    
            commit('listScenariosMutationWithObservers', changedList)
        },
        setDeleteItem(store, payload) {
            const {commit, getters} = store
            const scenario = deleteItem(JSON.parse(JSON.stringify(getters.getScenario.scenario)), JSON.parse(JSON.stringify(payload)))
            commit('scenarioMutation', {...getters.getScenario, scenario})
        },
        setDeleteBranch(store, payload) {
            const {commit, getters} = store
            const scenario = deleteBranch(JSON.parse(JSON.stringify(getters.getScenario.scenario)), JSON.parse(JSON.stringify(payload)))

            commit('scenarioMutation', {...getters.getScenario, scenario})
        },
        swapItems(store, payload) {
            const {getters, commit} = store
            commit('scenarioMutation', swapItems(getters.getItemScenario, payload, getters.getScenario))
            // console.log(getters.getScenario)
            commit('showConfigMutation', null)
            commit('setItemMutation', null)
            commit('isSwappedModeMutation', false)
        },
        setSortedArrayOfUids({commit, getters}) {
            const arrayOfUids = []
            getters.getListScenarios.forEach(el => arrayOfUids.push(el.uid))
            commit('sortedArrayOfUidsMutation', arrayOfUids)
        }
    },
    mutations: {
        arrayUidsOfDeleteScenariosMutation(state, payload) {
            state.arrayUidsOfDeleteScenarios = payload
        },
        arrayOfScenariosWithChangedNameMutation(state, payload) {
            state.arrayOfScenariosWithChangedName = payload
        },
        isSwappedModeMutation(state, payload) {
            state.isSwappedMode = payload
        },
        initialListMutation(state, payload) {
            state.initialList = JSON.parse(JSON.stringify(payload))
        },
        listScenariosMutationWithObservers(state, payload) {
            state.listScenarios = JSON.parse(JSON.stringify(payload))
        },
        listScenariosMutation(state, payload) {
            state.listScenarios = JSON.parse(JSON.stringify(payload))
        },
        listScenariosMutationAfterChangeName(state, payload) {
            state.listScenarios = JSON.parse(JSON.stringify(payload))
        },
        scenarioMutation(state, payload) {
            state.scenario = JSON.parse(JSON.stringify(payload))
        },
        initialScenarioMutation(state, payload) {
            state.initialScenario = JSON.parse(JSON.stringify(payload))
        },
        changeScenarioAfterUpdate(state, payload) {
            state.listScenarios = changeScenarioAfterUpdateParse(state.listScenarios, payload)
        },
        countriesScenarioMutation(state, payload) {
            state.countries = payload
        },
        addItemScenMutation(state, payload) {
            const {obj, item} = payload
            state.scenario.scenario = addItemScen(JSON.parse(JSON.stringify(state.scenario.scenario)), JSON.parse(JSON.stringify(payload.obj)), JSON.parse(JSON.stringify(payload.item)))
        },
        involvedNumbersMutation(state, payload) {
            state.numbersInvolved = payload
        },
        showConfigMutation(state, payload) {
            state.showConfiguration = payload
        },
        itemScenariosMutation(state, payload) {
            state.scenario.scenario = changeScenarios(state.scenario.scenario, payload)
            if(payload.schema === 'vnumber-in') {
                state.scenario.externalNumbers = payload.options.externalNumbers
            }
        },
        setItemMutation(state, payload) {
            state.item = payload
        },
        newScenarioMutation(state, payload) {
            state.listScenarios.push(payload)
            state.scenario = payload
        },
        deleteItemMutation(state, payload) {
            state.scenario.scenario = deleteBranch(JSON.parse(JSON.stringify(state.scenario.scenario)), JSON.parse(JSON.stringify(payload)))
        },
        sortedArrayOfUidsMutation(state, payload) {
            state.sortedArrayOfUids = payload
        }
    },
    getters: {
        getInitialList: state => state.initialList,
        getListScenarios: state => state.listScenarios,
        getScenario: state => state.scenario,
        getInitialScenario: state => state.initialScenario,
        getCountriesScenario: state => state.countries,
        getShowConfig: state => state.showConfiguration,
        getItemScenario: state => state.item,
        getInvolvedNumbers: state => state.numbersInvolved,
        getIsSwappedMode: state => state.isSwappedMode,
        getSortedArrayOfUids: state => state.sortedArrayOfUids,
        getArrayUidsOfDeleteScenarios: state => state.arrayUidsOfDeleteScenarios,
        getArrayOfScenariosWithChangedName: state => state.arrayOfScenariosWithChangedName
    }
}
