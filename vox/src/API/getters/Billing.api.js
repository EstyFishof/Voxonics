import { Api, handleError } from "@/API"
import store from "@/store"
import QueryParameters from '../QueryParameters'

const BillingGettersApi = {
    getStatement() {
        return Api().get('/reports/statement')
            .then(res => {
                
                store.dispatch('setStatement', res.data)
            })
            .catch(e => handleError(e))
    },
    getLastPayments(param = '', order = '') {
        const companyId = localStorage.getItem('getCompanyId')
        return Api().get(`/payments?&per-page=3&search=${param}&order=${order}&per-page=3`)
            .then(res => {
                store.dispatch('setLastPayments', res.data.data)
            })
            .catch(e => handleError(e))
    },
    getLastCharges(param = '', order = 'asc') {
        // const companyId = localStorage.getItem('getCompanyId')
        return Api().get(`/charges?&active=true&completed=false&search=${param}&order=${order}&per-page=3`)
            .then(res => {
                store.dispatch('setLastCharges', res.data.data)
            })
            .catch(e => handleError(e))
    },
    getPayments(config) {
        const {peerPage, page, search, order} = new QueryParameters(config)
        const companyId = localStorage.getItem('getCompanyId')
        return Api().get(`/payments?&per-page=${peerPage}&page=${page}&search=${search}&order=${order}`)
            .catch(e => handleError(e))
    },
    getCharges(config) {
        console.log(config)
        const {peerPage, page, search, order, sort} = new QueryParameters({ ...config, order: config.orderParam })
        // const companyId = localStorage.getItem('getCompanyId')
        return Api().get(`/charges?active=true&per-page=${peerPage}&page=${page}&search=${search}&order=${order}&sort=${sort}`)
            .catch(e => handleError(e))
    }
}

export default BillingGettersApi
