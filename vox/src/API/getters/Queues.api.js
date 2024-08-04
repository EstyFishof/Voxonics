import { Api, handleError } from "@/API"
import store from "@/store"
import QueryParameters from '../QueryParameters'

const QueuesGettersApi = {
    getQueues(config) {
        const {peerPage, sort, page, search, order} = new QueryParameters(config)
        return Api().get(`/queues/manage?&with-full-append&per-page=${peerPage}&sort=${sort}&order=${order}&page=${page}&search=${search}`)
            .catch((error) => handleError(error))
    },
    viewQueue(uid) {
        return Api().get(`/queues/${uid}?with-full-append`)
            .then(response => {
                store.dispatch('setInitialQueue', JSON.parse(JSON.stringify(response.data)))
                store.dispatch('setQueueInfo', response.data)
                return response.data
            })
            .catch((error) => handleError(error))
    },
}

export default QueuesGettersApi
