import { Api, handleError } from "@/API"
// import store from "@/store"
import QueryParameters from '../QueryParameters'

const NumbersGettersApi = {
    getNumbers(config) {
        const {peerPage, sort, page, country, number, description, order} = new QueryParameters(config)
        return Api().get(`external-numbers?with-full-append&per-page=${peerPage}&sort=${sort || ''}&page=${page || 1}&order=${order || ''}&country=${country || ''}&number=${number || ''}&description=${description || ''}`)
            // .then((response) => {
            //     // store.dispatch('getNumbers', response.data.data)
            //     // store.dispatch('setExternalNumbers', response.data.data)
            //     // store.dispatch('setGlobalExternalNumbers', response.data.data)
            //     // store.dispatch('setInitialAvaibleNumbers', JSON.parse(JSON.stringify((response.data.data))))
            //     return response.data
            // })
            .catch((error) => handleError(error))
    },
    getFullNumbers(arrayOfNumbers) {
        return Api().get(`external-numbers?numberIn=[${arrayOfNumbers}]`)
            .catch((error) => handleError(error))
    }
}

export default NumbersGettersApi
