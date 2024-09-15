import {newRoute, user} from '../../initial.state.js'
import {createRoute, updateRoutes, deleteRoute, updateUsersRoute, sortUsersRoutes} from '@/lib/parse.Routes.js'
import UsersGettersApi from '../../../API/getters/Users.api.js'
import { addUserRoutes, usersForLayout } from '../../../lib/parse.Routes.js'

export default  {
    state: {
        leftListRoutes: [],
        initialLeftListRoutes: [],
        rightListRoutes: [],
        initialRightListRoutes: []
    },
    actions: {
        getListOfUsersForOutboundRoutes({ commit }, payload) {
            UsersGettersApi.getUsersWithoutFullAppend(payload.config)
                .then(res => {
                    const data = usersForLayout(res.data.data)
                    if(payload.left) {
                        console.log(data)
                        commit('leftListRoutesMutation',JSON.parse(JSON.stringify(data)))
                        commit('initialLeftListRoutesMutation', JSON.parse(JSON.stringify(data)))
                        commit('setLeftRoutesPaginator', res.data.paginator)
                    }
                    if(payload.right) {
                        commit('rightListRoutesMutation', JSON.parse(JSON.stringify(data)))
                        commit('initialRightListRoutesMutation', JSON.parse(JSON.stringify(data)))
                        commit('setRightRoutesPaginator', res.data.paginator)
                    }
                })
        },
        getCurrentUserRoutes({commit, state}, payload) {
            UsersGettersApi.getRoutesOfUser(payload.uid)
                .then(res => {
                    if(payload.left) {
                        commit('setLeftListRoutes', addUserRoutes(state.leftListRoutes, {data: res.data.data, uid: payload.uid}))
                        commit('initialLeftListRoutesMutation', addUserRoutes(state.initialLeftListRoutes, {data: res.data.data, uid: payload.uid}))
                    }
                    if(payload.right) {
                        commit('setRightListRoutes', addUserRoutes(state.rightListRoutes, {data: res.data.data, uid: payload.uid}))
                        commit('initialRightListRoutesMutation', addUserRoutes(state.initialRightListRoutes, {data: res.data.data, uid: payload.uid}))
                    }
                })
        },
        getUsersWithoutRoutes(store, users) {
            return users.filter(user => !user.route.length)
        },
        setLeftListRoutes({ commit }, payload) {
            commit('leftListRoutesMutation', payload)
        },
        setInitialLeftListRoutes({ commit }, payload) {
            commit('initialLeftListRoutesMutation', payload)
        },
        setRightLisRoutest({ commit }, payload) {
            commit('rightListRoutesMutation', payload)
        },
        setInitialRightLisRoutest({ commit }, payload) {
            commit('initialRightListRoutesMutation', payload)
        },
        updateLeftListRoutes({ commit }, payload) {
            commit('updateLeftListRoutesMutation', payload)
        },
        updateUsersRoutes({ commit }, payload) {
            commit('updateUsersRoutesMutation', payload)
        },
        updateRightListRoutes({ commit }, payload) {
            commit('updateRightListRoutesMutation', payload)
        },
        createRoute({ commit }, payload) {
            commit('createRouteMutation', payload)
        },
        deleteRoute({ commit }, payload) {
            commit('deleteRouteMutation', payload)
        }
    },
    mutations: {
        leftListRoutesMutation(state, payload) {
            payload.forEach(el => {
                el.open = false
                el.edit = false
                el.newRoute = JSON.parse(JSON.stringify(newRoute))
            })
            // console.log(payload)
            state.leftListRoutes = sortUsersRoutes(payload)
        },
        setLeftListRoutes(state, payload) {
            state.leftListRoutes = payload
        },
        initialLeftListRoutesMutation(state, payload) {
            state.initialLeftListRoutes = sortUsersRoutes(payload)
        },
        rightListRoutesMutation(state, payload) {
            payload.forEach(el => {
                el.open = false
                el.edit = false
                el.newRoute = JSON.parse(JSON.stringify(newRoute))
            })
            state.rightListRoutes = sortUsersRoutes(payload)
        },
        setRightListRoutes(state, payload) {
            state.rightListRoutes = payload
        },
        initialRightListRoutesMutation(state, payload) {
            state.initialRightListRoutes = sortUsersRoutes(payload)
        },
        updateLeftListRoutesMutation(state, payload) {
            state.leftListRoutes = updateRoutes(JSON.parse(JSON.stringify(state.leftListRoutes)), payload)
            state.initialLeftListRoutes = updateRoutes(JSON.parse(JSON.stringify(state.initialLeftListRoutes)), payload)
        },
        updateRightListRoutesMutation(state, payload) {
            state.rightListRoutes = updateRoutes(JSON.parse(JSON.stringify(state.rightListRoutes)), payload)
            state.initialRightListRoutes = updateRoutes(JSON.parse(JSON.stringify(state.initialRightListRoutes)), payload)
        },
        updateUsersRoutesMutation(state, payload) {
            state.leftListRoutes = updateUsersRoute(JSON.parse(JSON.stringify(state.leftListRoutes)), payload)
            state.rightListRoutes = updateUsersRoute(JSON.parse(JSON.stringify(state.rightListRoutes)), payload)
            state.initialLeftListRoutes = updateUsersRoute(JSON.parse(JSON.stringify(state.initialLeftListRoutes)), payload)
            state.initialRightListRoutes = updateUsersRoute(JSON.parse(JSON.stringify(state.initialRightListRoutes)), payload)
        },
        createRouteMutation(state, payload) {
            state.leftListRoutes = createRoute(JSON.parse(JSON.stringify(state.leftListRoutes)), payload)
            state.rightListRoutes = createRoute(JSON.parse(JSON.stringify(state.rightListRoutes)), payload)
            state.initialLeftListRoutes = createRoute(JSON.parse(JSON.stringify(state.initialLeftListRoutes)), payload)
            state.initialRightListRoutes = createRoute(JSON.parse(JSON.stringify(state.initialRightListRoutes)), payload)
        },
        deleteRouteMutation(state, payload) {
            state.leftListRoutes = deleteRoute(JSON.parse(JSON.stringify(state.leftListRoutes)), payload)
            state.rightListRoutes = deleteRoute(JSON.parse(JSON.stringify(state.rightListRoutes)), payload)
            state.initialLeftListRoutes = deleteRoute(JSON.parse(JSON.stringify(state.initialLeftListRoutes)), payload)
            state.initialRightListRoutes = deleteRoute(JSON.parse(JSON.stringify(state.initialRightListRoutes)), payload)
        }
    },
    getters: {
        getLeftListRoutes: state => state.leftListRoutes,
        getInitialLeftListRoutes: state => state.initialLeftListRoutes,
        getRightListRoutes: state => state.rightListRoutes,
        getInitialRightListRoutes: state => state.initialRightListRoutes,
    }
}
