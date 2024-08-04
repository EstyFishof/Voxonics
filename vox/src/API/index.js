import axios from "axios"
import store from "../store/index"
import router from '../router/index'
import AbortDecorator from './AbortDecorator'

export const Api = () => {
    const result = axios.create({
        baseURL: window.env.BASE_URL,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        timeout: 5000
    })
    result.interceptors.request
        .use(
            (response) => {
                store.dispatch('setSpinner', true)
                return response
            }
        )
    result.interceptors.response
        .use(
            (response) => {
                store.dispatch('setSpinner', false)
                return response
            }
        )
    return AbortDecorator(result)
}
const text = 'Please try reload your page or re-login, if it doesn\'t help connect to our support team.'
const switcher = error => {
    store.dispatch('setSpinner', false)
    switch (error.response.status) {
        case 400:
            store.dispatch('emitError', error.response.data.details.message)
            return error.response.data.details.message
        case 401:
            localStorage.removeItem('token')
            store.dispatch('pushLogout')
            store.dispatch('emitError', error.response.data.details.message)
            router.push("/")
            return error.response.data.details.message
        case 403:
            store.dispatch('emitError', error.response.data.details.message || 'Forbidden')
            return error.response.data.error
        case 404:
            store.dispatch('emitError', 'Page Not Found')
            return error.response.data.message
        case 405:
            store.dispatch('emitError', error.response.data.message)
            return error.response.data.message
        case 422:
            store.dispatch('emitError', error.response.data.errors)
            return error.response.data.errors
        case 429:
            store.dispatch('emitError', error.response.data.message)
            return error.response.data.errors
        case 500:
            store.dispatch('emitError', text)
            return error.response.data.message
        default:
            store.dispatch('emitError', "Unknown")
            return error.response.data.details.message
    }
}

export const handleError = error => {

    try {
        if (error.message.includes('timeout') || error.message.includes('canceled')) {
            return error.message
        }
        if (!error.response?.status && !(error?.response.data instanceof ArrayBuffer)) {
            store.dispatch('emitError', "Unknown")
        } else {
            if (error.response?.data instanceof ArrayBuffer) {
                const enc = new TextDecoder("utf-8")
                const err = JSON.parse(enc.decode(error.response.data))
                if (err.code === 422) {
                    store.dispatch('emitError', err.details.message)
                    return err.details.message
                }
            } else {

                switcher(error)
            }
        }
    } catch (error) {
        store.dispatch('emitError', "Sorry... Something went wrong")
    }
}
