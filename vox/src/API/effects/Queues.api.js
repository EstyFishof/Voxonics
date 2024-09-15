import { Api, handleError } from "@/API"
import store from "@/store"
import router from "../../router"

const QueuesEffectsApi = {
    updateQueue(q) {
        return Api().patch(`/queues/${q.uid}?with-full-append`, q)
            .then(response => {
                
                store.dispatch('setQueueInfo', response.data)
                store.dispatch('setInitialQueue', JSON.parse(JSON.stringify(response.data)))
                return response.data
            })
            .catch((error) => {
                handleError(error)
                store.dispatch('setQueueInfo', {...store.getters.getInitialQueue})
            })
    },
    createQueue(queue) {
        return Api().post('/queues', JSON.stringify({ ...queue }), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                
                store.dispatch('resetCreateQueue')
                return router.push('/config/queues')
            })
            .catch((error) => handleError(error))
    },
    deleteQueue(uid) {
        return Api().delete(`/queues/${uid}`)
            .then(() => {
                
                return router.push('/config/queues')
            })
            .catch((error) => handleError(error))
    },
}

export default QueuesEffectsApi
