import { user } from '../../initial.state'
import { userReset } from '../../initial.state'

export default {
    state: {
        form: JSON.parse(JSON.stringify(user)),
        listSelectedQueues: [],
        listSelectedDepartments: [],
        listManageDepartments: [],
        listManageQueues: [],
        listUsers: [],
        listRelatedQueues: [],
        listRelatedDepartments: [],
        // outInfo: []
    },
    actions: {
        listSearchUsers({commit}, list) {
            commit('pushSearchUsers', list)
        },
        queuesRelated({commit}, list) {
            commit('pushRelatedQueues', list)
        },
        setCreatePermissionCDR({commit}, payload) {
            commit('setCreatePermissionCDRMutation', payload)
        },
        setCreatePermissionBilling({commit}, payload) {
            commit('createPermissionBillingMutation', payload)
        },
        queuesSelected({commit}, list) {
            commit('pushSelectedQueues', list)
        },
        departmentsRelated({commit, state}, list) {
            commit('pushRelatedDepartments', list)
            if (!state.listSelectedDepartments.length) {
                commit('pushSelectedDepartments', list.filter(d => d.name === 'main'))
            }
        },
        departmentsSelected({commit}, list) {
            commit('pushSelectedDepartments', list)
        },
        setAvatar({commit}, ava) {
            commit('pushAvatar', ava)
        },
        setUserInfo({commit}, obj) {
            commit('pushField', obj)
        },
        setOutInfo({commit}, list) {
            commit('pushOutInfo', list)
        },
        setVNumber({commit}, num) {
            commit('pushVNumber', num)
        },
        setRole({commit}, role) {
            commit('pushRole', role)
        },
        depManagerSelected({commit}, list) {
            commit('pushDepManaged', list)
        },
        queueManagerSelected({commit}, list) {
            commit('pushQueueManaged', list)
        },
        setSelectedQueues({commit}, payload) {
            commit('selectedQueuesMutation', payload)
        },
        reset({commit}) {
            commit('setInitialState')
        }
    },
    mutations: {
        pushSearchUsers(state, list) {
            state.listUsers = list
        },
        pushRelatedQueues(state, list) {
            state.listRelatedQueues = list
        },
        pushSelectedQueues(state, list) {
            const array = []
            list.map(q => array.push(q.uid))
            state.form.relatedWith.queueUid = array
            state.listSelectedQueues = list
        },
        setCreatePermissionCDRMutation(state, payload) {
            if (state.form.permission.cdr === null && state.form.permission.cdr === undefined) {
                state.form.permission.cdr = {}
            }
            state.form.permission.cdr[payload.param] = payload.value
        },
        createPermissionBillingMutation(state, payload) {
            state.form.permission.view.billing = payload
        },
        pushRelatedDepartments(state, list) {
            state.listRelatedDepartments = list
        },
        pushSelectedDepartments(state, list) {
            const array = []
            list.map(dep => array.push(dep.uid))
            state.form.relatedWith.departmentUid = array
            state.listSelectedDepartments = list
        },
        pushAvatar(state, ava) {
            state.form.avatar = ava
        },
        pushField(state, obj) {
            for (const obgKey in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, obgKey)) {
                    state.form[obgKey] = obj[obgKey]
                }
            }

        },
        // pushOutInfo(state, list) {
        //     state.outInfo = list
        // },
        pushRole(state, role) {
            state.form.permission.role = role
        },
        pushDepManaged(state, list) {
            state.listManageDepartments = list
            state.form.manage.department = []
            list.forEach(dep => {
                const d = {departmentUid: dep.uid, edit: dep.edit}
                state.form.manage.department.push(d)
            })
        },
        pushQueueManaged(state, list) {
            state.listManageQueues = list
            state.form.manage.queue = []
            list.forEach(q => {
                const d = {queueUid: q.uid, edit: q.edit}
                state.form.manage.queue.push(d)
            })
        },
        selectedQueuesMutation(state, payload) {
            state.listSelectedQueues = payload
        },
        setInitialState(state) {
            state.form = JSON.parse(JSON.stringify(userReset))
            state.listSelectedQueues = []
            state.listSelectedDepartments = []
            state.listManageQueues = []
            state.listManageDepartments = []
            state.listRelatedDepartments = []
            state.listRelatedQueues = []
        }
    },
    getters: {
        getForm: state => state.form,
        getRole: state => state.form.permission.role,
        getAvatar: state => state.form.avatar,
        getSearchUsers: state => state.listUsers,
        getRelatedQueues: state => state.listRelatedQueues,
        getSelectedQueues: state => state.listSelectedQueues,
        getRelatedDepartments: state => state.listRelatedDepartments,
        getSelectedDepartments: state => state.listSelectedDepartments,
        getDepManaged: state => state.listManageDepartments,
        getQueueManaged: state => state.listManageQueues,
        // outInfo: state => state.outInfo,
    },
}

