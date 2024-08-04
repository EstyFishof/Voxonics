import { user } from '../../initial.state'
import _ from 'lodash'

export default {
    state: {
        user: user,
        initialUser: JSON.parse(JSON.stringify(user)),
        uid: '',
        editMode: false,
        updateSuccess: false,
        fields: {
            pushAva: 'avatar',
            pushField: ['name', 'phone', 'location', 'position', 'email', 'internalNumber', 'password', 'confirm'],
            addSelectedQueues: 'relatedWith',
            setDeps: 'relatedWith',
            setNewRole: 'permission',
            setVNumber: 'extra',
            userDepsManaged: 'manage',
            userQueuesManaged: 'manage',
            setPermissionCDRMutation: 'permission',
            viewBillingReportsMutatution: 'permission',
            editQueueMutation: 'manage'
        },
        changedFields: [],
        delete: false
    },

    actions: {
        setViewUser({commit}, payload) {
            commit('setUserInfo', payload)
        },
        setInitialUser({commit}, payload) {
            commit('initialUserMutation', payload)
        },
        successUserUpdate({dispatch}) {
            dispatch('emitSuccess', 'Updated')
        },
        changeUserInfo({commit}, obj) {
            commit('pushField', obj)
        },
        setAva({commit}, ava) {
            commit('pushAva', ava)
        },
        updateAvatar({ commit }, payload) {
            commit('updateAvatarMutation', payload)
        },
        usersQueuesSelected({commit}, list) {
            commit('addSelectedQueues', list)
        },
        toggleEditMode({commit}, bool) {
            commit('setEditMode', bool)
        },
        changeDeps({commit}, list) {
            commit('setDeps', list)
        },
        changeRole({commit}, role) {
            commit('setNewRole', role)
        },
        changeVNumber({commit}, number) {
            commit('setVNumber', number)
        },
        setUserDepsManaged({commit}, list) {
            commit('userDepsManaged', list)
        },
        setUserQueuesManaged({commit}, list) {
            commit('userQueuesManaged', list)
        },
        setDeleteUser({commit}, bool) {
            commit('deleteUserMutation', bool)
        },
        setPermissionCDR({commit}, payload) {
            commit('setPermissionCDRMutation', payload)
        },
        setCDRView({commit}, payload) {
            commit('setCDRViewMutation', payload)
        },
        setCDRListen({commit}, payload) {
            commit('setCDRListenMutation', payload)
        },
        setCDRExport({commit}, payload) {
            commit('setCDRExportMutation', payload)
        },
        setCDRBilling({commit}, payload) {
            commit('setCDRBillingMutation', payload)
        },
        setViewBillingReports({commit}, payload) {
            commit('viewBillingReportsMutatution', payload)
        },
        setRelatedQueues({commit}, payload) {
            commit('relatedQueuesMutation', payload)
        },
        setEditQueue({commit}, payload) {
            commit('editQueueMutation', payload)
        }
    },
    mutations: {
        writeChanges(state, payload) {
            if (!state.changedFields.includes(payload)) {
                state.changedFields.push(payload)
            }
        },
        initialUserMutation(state, payload) {
            let array = []
            payload.relatedWith.queue.forEach(el => {
                array.push({name: el.name, internalNumber: el.internalNumber, userCount: el.userCount, uid: el.uid})
            })
            payload.relatedWith.queue = array
            array = []
            if (payload.permission.role !== 'agent') {
                payload.manage.queue.forEach(el => {
                    array.push({
                        name: el.name,
                        internalNumber: el.internalNumber,
                        uid: el.uid,
                        option: {edit: !!el.option.edit}
                    })
                })
                payload.manage.queue = array
                payload.manage.department = payload.manage.department.map(el => {
                    el = {...el, ...{option: {edit: !!el.option.edit}}}
                    return el
                })
            }
            payload.internalNumber = payload.internalNumber.toString()
            payload.relatedWith.department = _.sortBy(payload.relatedWith.department, [function (o) {
                return o.name
            }])
            payload.relatedWith.queue = _.sortBy(payload.relatedWith.queue, [function (o) {
                return o.name
            }])
            if (payload.permission.role !== 'agent') {
                payload.manage.department = _.sortBy(payload.manage.department, [function (o) {
                    return o.name
                }])
                payload.manage.queue = _.sortBy(payload.manage.queue, [function (o) {
                    return o.name
                }])
            }
            state.initialUser = {...payload, password: '', confirm: ''}
        },
        setPermissionCDRMutation(state, payload) {
            if (state.user.permission.cdr === null) {
                state.user.permission.cdr = {}
            }
            state.user.permission.cdr[payload.param] = payload.value
        },
        setCDRViewMutation(state, payload) {
            state.user.permission.cdr.view = payload
        },
        setCDRListenMutation(state, payload) {
            state.user.permission.cdr.listen = payload
        },
        setCDRExportMutation(state, payload) {
            state.user.permission.cdr.export = payload
        },
        setCDRBillingMutation(state, payload) {
            state.user.permission.cdr.billing = payload
        },
        resetChanges(state) {
            state.changedFields = []
        },
        setUserInfo(state, payload) {
            let array = []
            payload.user.relatedWith.queue.forEach(el => {
                array.push({name: el.name, internalNumber: el.internalNumber, userCount: el.userCount, uid: el.uid})
            })
            payload.user.relatedWith.queue = array
            array = []
            if (payload.user.permission.role !== 'agent') {
                payload.user.manage.queue.forEach(el => {
                    array.push({
                        name: el.name,
                        internalNumber: el.internalNumber,
                        uid: el.uid,
                        option: {edit: !!el.option.edit}
                    })
                })
                payload.user.manage.queue = array
                payload.user.manage.department = payload.user.manage.department.map(el => {
                    el = {...el, ...{option: {edit: !!el.option.edit}}}
                    return el
                })
            }
            payload.user.relatedWith.department = _.sortBy(payload.user.relatedWith.department, [function (o) {
                return o.name
            }])
            payload.user.relatedWith.queue = _.sortBy(payload.user.relatedWith.queue, [function (o) {
                return o.name
            }])
            payload.user.internalNumber = payload.user.internalNumber.toString()
            if (payload.user.permission.role !== 'agent') {
                payload.user.manage.department = _.sortBy(payload.user.manage.department, [function (o) {
                    return o.name
                }])
                payload.user.manage.queue = _.sortBy(payload.user.manage.queue, [function (o) {
                    return o.name
                }])
            }
            if (!payload.array?.length) {
                state.user = {...payload.user, password: '', confirm: ''}
                state.uid = payload.uid
            } else {
                payload.array.forEach(k => {
                    delete payload.user[k]
                })
                state.user = {...state.user, ...payload.user, password: '', confirm: ''}
                state.uid = payload.uid
            }
        },
        pushAva(state, ava) {
            state.user.avatar = ava
        },
        updateAvatarMutation(state, payload) {
            state.user.avatar = payload.avatar
            state.initialUser.avatar = payload.avatar
        },
        pushField(state, obj) {
            for (const obgKey in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, obgKey)) {
                    state.user[obgKey] = obj[obgKey]
                }
            }
        },
        addSelectedQueues(state, list) {
            const array = []
            list.forEach(q => array.push(q))
            state.user.relatedWith.queue = array
        },
        setEditMode(state, bool) {
            state.editMode = bool
        },
        setDeps(state, list) {
            state.user.relatedWith.department = list
        },
        setNewRole(state, role) {
            if (role === 'manager') {
                if (!state.user.manage) {
                    state.user.manage = {
                        department: [],
                        queue: []
                    }
                }
                if (!state.user.permission.cdr || !state.user.permission.view) {
                    state.user.permission.cdr = user.permission.cdr
                    state.user.permission.view = user.permission.view
                }
            }
            state.user.permission.role = role
        },
        setVNumber(state, number) {
            if (!state.user.extra.route[0]) {
                state.user.extra.route[0] = {externalNumber: number}
            } else {
                Object.assign(state.user.extra.route[0], {externalNumber: number})
            }

        },
        userDepsManaged(state, list) {
            list.forEach(item => {
                delete item.view
            })
            state.user.manage.department = list
        },
        userQueuesManaged(state, list) {
            list.forEach(item => {
                delete item.view
            })
            state.user.manage.queue = list
        },
        editQueueMutation(state, queue) {
            state.user.manage.queue.forEach(item => {
                if (item.uid === queue.uid) {
                    item.option.edit = queue.option.edit
                }
            })
        },
        deleteUserMutation(state, bool) {
            state.delete = bool
        },
        viewBillingReportsMutatution(state, bool) {
            state.user.permission.view.billing = bool
        },
        relatedQueuesMutation(state, payload) {
            state.user.relatedWith.queue = payload
        }
    },
    getters: {
        userInfoVuex: state => state.user,
        getInitialUser: state => state.initialUser,
        number: state => state.user.extra?.route[0]?.externalNumber?.uid,
        userAva: state => state.user.avatar,
        departments: state => state.user.relatedWith.department,
        queues: state => state.user.relatedWith.queue,
        userRole: state => state.user.permission.role,
        userQueues: state => state.user.relatedWith.queue,
        userManageQueues: state => state.user.manage.queue,
        userManageDeps: state => state.user.manage.department,
        userUid: state => state.uid,
        editMode: state => state.editMode,
        getDeleteUser: state => state.delete,
        getSecret: state => state.user.secret,
        changeFields: state => state.changedFields,
        getPermissionCDR: state => state.user.permission.cdr,
        getPermissionBilling: state => state.user.permission.view
    },
}
