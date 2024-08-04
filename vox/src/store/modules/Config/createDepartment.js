import { department } from "../../initial.state"
import { DepartmentEffectsApi } from '@/API/effects'
import { DepartmentParse } from "@/lib/parse.department"

export default {
    state: {
        newDepartment: department,
        numbers: [],
        errors: []
    },
    actions: {
        //<<<<<<<<<<<<setters>>>>>>>>>>>>>>
        transferNameDepartment({ commit }, name) {
            commit('setNameDepartment', name)
        },
        transferAgentsDepartment({ commit }, agents) {
            commit('setAgentsDepartment', agents)
        },
        transferManagersDepartment({ commit }, managers) {
            commit('setManagersDepartment', managers)
        },
        transferNumberDepartment({ commit }, numbers) {
            commit('setNumberDepartment', numbers)
        },
        resetCreateDep({ commit }) {
            commit('clearDep')
        },
        createDepartment(store, payload) {
            const form = JSON.parse(JSON.stringify(payload))//избавляемся от обзерверов
            const dep = DepartmentParse(form)
            DepartmentEffectsApi.createDepartment(dep)
                .then(() => store.dispatch('getUserInfo'))
        }
    },
    mutations: {

        //<<<<<<<<<<<<setters>>>>>>>>>>>>>>
        setNameDepartment(state, name) {
            state.newDepartment.name = name
        },
        setAgentsDepartment(state, agents) {
            state.newDepartment.relatedWith.userUid = agents
        },
        setManagersDepartment(state, managers) {
            state.newDepartment.belongTo = managers
        },
        setNumberDepartment(state, numbers) {
            state.newDepartment.relatedWith.externalNumberUid = numbers
        },
        clearDep(state) {
            state.newDepartment = {
                name: "",
                relatedWith: {
                    externalNumberUid: [],
                    userUid: []
                },
                belongTo: []
            }
        }
    },
    getters: {
        newDepartment: state => state.newDepartment,
        newDepartmentName: state => state.newDepartment.name,
        newDepartmentAgents: state => state.newDepartment.relatedWith.userUid,
        newDepartmentNumbers: state => state.newDepartment.relatedWith.externalNumberUid,
        newDepartmentManagers: state => state.newDepartment.belongTo,
    }
}
