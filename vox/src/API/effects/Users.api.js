import { Api, handleError } from '../index'
import store from '../../store'
import router from "../../router"

const UsersEffectsApi = {
    createUser(user) {
        return Api().post('/users', JSON.stringify({ ...user }), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                
                store.dispatch('reset')
                return router.push('/config/users')
            })
            .catch((error) => handleError(error))
    },
    submitAvatar(img, string) {
        return Api().post("/users/avatar", img)
            .then((response) => {
                
                if (!string.length) {
                    store.dispatch('setAvatar', response.data.url)
                } else {
                    store.dispatch('setAva', response.data.url)
                }
                return response.data.url
            })
            .catch((error) => handleError(error))
    },
    updateUser(user, id) {
        const url = id !== store.getters.userInfo.uid
                            ? `/users/${id}?&with-full-append`
                            : `/auth?&with-full-append`
        return Api().patch(url, JSON.stringify({ ...user }), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                
                store.dispatch('successUserUpdate')
                const uid = response.data.uid
                const user = response.data
                delete user.dateCreated
                delete user.dateUpdated
                store.dispatch('setInitialUser', JSON.parse(JSON.stringify(user)))
                store.dispatch('setViewUser', { user: user, uid: uid, array: [] })
                if(id === store.getters.userInfo.uid) {
                    store.dispatch('pushUserInfo', JSON.parse(JSON.stringify(user)))
                }
                return response.data
            })
            .catch((error) => {
                store.dispatch('setViewUser', {user: { ...store.getters.getInitialUser }})
                handleError(error)
            })
    },
    updateUserAvatar(user, id) {
        const url = id !== store.getters.userInfo.uid
                            ? `/users/${id}?&with-full-append`
                            : `/auth?&with-full-append`
        return Api().patch(url, JSON.stringify({avatar: user.avatar}), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                
                // store.dispatch('successUserUpdate')
                const user = response.data

                store.dispatch('updateAvatar', JSON.parse(JSON.stringify(user)))
                if(id === store.getters.userInfo.uid) {
                    store.dispatch('pushUserInfo', JSON.parse(JSON.stringify(user)))
                }
                return response.data
            })
            .catch((error) => {
                store.dispatch('updateAvatar', store.getters.getInitialUser)
                handleError(error)
            })
    },
    updateArrayOfUsers(user) {
        return Api().patch(`/users/${user.uid}?&with-full-append`, user)
            .then(response =>  {
                
                return response.data
            })
            .catch(error => {
                handleError(error)
                throw(error)
            })
    },
    deleteUser(uid) {
        return Api().delete(`/users/${uid}`)
            .then(() => {
                
                return router.push('/config/users')
            })
            .catch((error) => handleError(error))
    },
    blockUser(id, boolean) {
        return Api().patch(`/users/${id}/block/${+boolean}?with-full-append`)
            .then(response => {
                
                const uid = response.data.uid
                const user = response.data
                delete user.uid
                delete user.dateCreated
                delete user.dateUpdated
                store.dispatch('setInitialUser', JSON.parse(JSON.stringify(user)))
                store.dispatch('setViewUser', { user: user, uid: uid, array: [] })
                return response.data
            })
            .catch((error) => {
                handleError(error)
                throw(error)
            })
    },
    pauseUser(user) {
        return Api().patch(`users/${user.uid}/pause/${user.pause}`)
            .catch(error => handleError(error))
    },
    logOutUser(user) {
        return Api().get(`users/${user.uid}/logout`)
            .catch(error => handleError(error))
    },


    //Routes
    createRoute(id, payload) {
        const url = id !== store.getters.userInfo.uid
            ? `/users/${id}/routes?&with-full-append`
            : `/auth/routes?&with-full-append`
        return Api().post(url, payload)
            .then(res => {
                
                store.dispatch('createRoute', {route: res.data, userUid: id})
                return res
            })
            .catch(error => {
                handleError(error)
            })
    },
    deleteRoute(userUid, id) {
        const url = userUid !== store.getters.userInfo.uid
            ? `/users/${userUid}/routes/${id}?&with-full-append`
            : `/auth/routes/${id}?&with-full-append`
        return Api().delete(url)
            .then(res => {
                
                store.dispatch('deleteRoute', {userUid: userUid, routeUid: id})
                return res
            })
            .catch(error => {
                handleError(error)
            })
    },
    updateRoutes(userUid, routeUid, obj) {
        const url = userUid !== store.getters.userInfo.uid
            ? `/users/${userUid}/routes/${routeUid}`
            : `/auth/routes/${routeUid}?&with-full-append`
        return Api().patch(url, obj)
            .then(res => {
                
                store.dispatch('updateLeftListRoutes', JSON.parse(JSON.stringify(res.data)))
                store.dispatch('updateRightListRoutes', JSON.parse(JSON.stringify(res.data)))
                return res
            })
            .catch(e => handleError(e))
    },
    updateUserRoutes(userUid, routes) {
        return Api().put(`/users/${userUid}/routes`, routes)
            .then(res => {
                
                store.dispatch('updateUsersRoutes', {routes: res.data.data, userUid: userUid})
            })
            .catch(e => {
                handleError(e)
                throw e
            })
    },
}


export default UsersEffectsApi
