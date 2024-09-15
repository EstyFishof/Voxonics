import {DepartmentGettersApi} from '@/API/getters'
import {DepartmentEffectsApi} from '@/API/effects'
import DepartmentChangedParse from '@/lib/parse.changedDepartment'

export default {
    state: {
        department: {
            name: "",
            relatedWith: {
                externalNumber: [],
                user: []
            },
            belongTo: { user: [] }
        },
        initialDep: null,
        delete: false
    },
    actions: {
        getDepartmentInfo({ commit }, dep) {
            commit('pushDepartment', dep)
        },
        setInitialDep({ commit }, payload) {
            commit('initialDepMutation', payload)
        },
        changeNameDepartment({ commit }, name) {
            commit('pushNameDepartment', name)
        },
        changeAgentsDepartment({ commit }, agents) {
            commit('pushAgentsDepartment', agents)
        },
        changeManagersDepartment({ commit }, managers) {
            commit('pushManagersDepartment', managers)
        },
        changeNumbersDepartment({ commit }, numbers) {
            commit('pushNumbersDepartment', numbers)
        },
        setDeleteDep({ commit }, bool) {
            commit('deleteDepMutation', bool)
        },
        viewDepartment(state, uid) {
            DepartmentGettersApi.viewDepartment(uid)
        },
        deleteDepartment(state, uid) {
            DepartmentEffectsApi.deleteDepartment(uid)
        },
        updateDepartment(state, payload) {
            const form = JSON.parse(JSON.stringify(payload))//избавляемся от обзерверов
            const dep = DepartmentChangedParse(form)
            DepartmentEffectsApi.updateDepartment(dep)
        }
    },
    mutations: {
        pushDepartment(state, dep) {
            dep.belongTo.user.forEach(element => {
                element.option.edit = !!element.option.edit
            })
            state.department = dep
        },
        initialDepMutation(state, payload) {
            payload.belongTo.user.forEach(element => {
                element.option.edit = !!element.option.edit
            })
            state.initialDep = payload
        },
        pushNameDepartment(state, name) {
            state.department.name = name
        },
        pushAgentsDepartment(state, agents) {
            state.department.relatedWith.user = agents
        },
        pushManagersDepartment(state, managers) {
            state.department.belongTo.user = managers
        },
        pushNumbersDepartment(state, numbers) {
            state.department.relatedWith.externalNumber = numbers
        },
        deleteDepMutation(state, bool) {
            state.delete = bool
        }
    },
    getters: {
        departmentInfo: state => state.department,
        getInitialDep: state => state.initialDep,
        departmentInfoName: state => state.department.name,
        numbersDep: state => state.department.relatedWith.externalNumber,
        agentsDep: state => state.department.relatedWith.user,
        managersDep: state => state.department.belongTo.user,
        getDeleteDep: state => state.delete
    },
}
