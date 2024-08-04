import store from "@/store"

export default (axiosInstance) => {
    return {
        get(...args) {
            const abortController = new AbortController()
            store.commit('addAbortController', abortController)
            return axiosInstance.get(...args, {signal: abortController.signal})
                .then(data => {
                    store.commit('removeAbortController', abortController)
                    return data
                })
                .catch(error => {
                    store.commit('removeAbortController', abortController)
                    throw error
                })
        },
        post(...args) {
            return axiosInstance.post(...args)
        },
        put(...args) {
            return axiosInstance.put(...args)
        },
        patch(...args) {
            return axiosInstance.patch(...args)
        },
        delete(...args) {
            return axiosInstance.delete(...args)
        },
    }
}
