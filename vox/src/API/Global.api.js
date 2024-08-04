import { Api, handleError } from './index'
import store from '../store'

export default {
    getUserInfo() {
        return Api().get(`auth?&with-full-append`)
            .then(response => response)
            .catch(error => handleError(error))
    },
    getDirections(perPage = 9, search = '') {
        return Api().get(`directions?per-page=${perPage}&code=${search}`)
            .then(res => store.dispatch('setDirections', res.data.data))
            .catch(e => handleError(e))
    },
    getLocation(perPage = 9, search = '') {
        return Api().get(`/locations?per-page=${perPage}&search=${search}`)
            .then(res => {
                store.dispatch('setGlobalLocations', res.data.data)
                return res.data
            })
            .catch(error => handleError(error))

    },
    getCountry() {
        return Api().get(`/countries/simple`)
            .then(response => {
                store.dispatch('setCountry', response.data)
                return response.data
            })
            .catch(error => {
                handleError(error)
                localStorage.setItem('getCountry', true)
            })
    },
}
