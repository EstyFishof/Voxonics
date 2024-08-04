import { Api, handleError } from '../index'
import store from '../../store'
import QueryParameters from '../QueryParameters'

const UsersGettersApi = {
    getUsers(config) {
        const {peerPage, sort, page, search, order, role} = new QueryParameters(config)
        return Api().get(`users?&with-full-append&per-page=${peerPage}&sort=${sort}&page=${page}&search=${search}&order=${order}&role=${role}`)
            .catch((error) => handleError(error))
    },
    getUsersWithoutFullAppend(config) {
        const {peerPage, sort, page, search, order, role} = new QueryParameters(config)
        return Api().get(`users?with-full-append&per-page=${peerPage}&sort=${sort}&page=${page}&search=${search}&order=${order}&role=${role}`)
            .catch((error) => handleError(error))
    },
    getUsersSimple() {
        return Api().get('/users/simple')
            .then(response => {
                store.dispatch('setUsersCDR', response.data)
            })
            .catch(error => handleError(error))
    },

    outboundDirection() {
        return Api().get("directions?type=default")
            .then((response) => {
                return response.data.data
            })
            .catch((error) => handleError(error))
    },
    viewUser(uid, array = []) {
        const url = uid !== store.getters.userInfo?.uid
            ? `/users/${uid}?&with-full-append`
            : `/auth?&with-full-append`
        return Api().get(url)
            .then((response) => {
                const uid = response.data.uid
                const user = response.data
                delete user.uid
                delete user.dateCreated
                delete user.dateUpdated
                store.dispatch('setInitialUser', JSON.parse(JSON.stringify(user)))
                store.dispatch('setViewUser', { user: user, uid: uid, array: array })
                return response.data
            })
            .catch((error) => {
                handleError(error)
            })
    },
    logOutUser(user) {
        return Api().get(`users/${user.uid}/logout`)
            .catch(error => handleError(error))
    },


    //Routes
    getRoutes(obj, perPage = 12, page = 1, search = '', sort = 'dateCreated', order = 'asc') {
        return Api().get(`/users/routes?per-page=${perPage}&page=${page}&search=${search}&sort=${sort}&order=${order}`)
            .then(res => {
                store.dispatch('setGlobalUsersRoutes', res.data.data)
                if(obj.left) {
                    store.dispatch('setLeftListRoutes',JSON.parse(JSON.stringify(res.data.data)))
                    store.dispatch('setInitialLeftListRoutes', JSON.parse(JSON.stringify(res.data.data)))
                    store.commit('setLeftRoutesPaginator', res.data.paginator)
                }
                if(obj.right) {
                    store.dispatch('setRightLisRoutest', JSON.parse(JSON.stringify(res.data.data)))
                    store.dispatch('setInitialRightLisRoutest', JSON.parse(JSON.stringify(res.data.data)))
                    store.commit('setRightRoutesPaginator', res.data.paginator)
                }
            })
            .catch(e => {
                handleError(e)
            })
    },
    getRoutesOfUser(id) {
        const url = id !== store.getters.userInfo.uid
            ? `/users/${id}/routes?&with-full-append`
            : `/auth/routes?&with-full-append`
        return Api().get(url)
            .then(res => {
                return res
            })
            .catch(error => {
                handleError(error)
            })
    },
}

export default UsersGettersApi
