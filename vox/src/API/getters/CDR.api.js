import { Api, handleError } from "@/API"
import store from "@/store"

const CDRGettersApi = {

    getCDR(queryString) {
        return Api().get(`cdr?${queryString}`)
            .then(response => {
                
                store.dispatch('setCDR', response.data.data)
                store.dispatch('setPaginatorCDR', response.data.paginator)
                return response.data
            })
            .catch(error => handleError(error))
    },
    getCSV(queryString) {
        return Api().get(`cdr/csv?${queryString}`)
            .then(response => {
                
                return response.data
            })
            .catch(error => handleError(error))
    },
    getMusic(id) {
        return Api().get(`/cdr/record/${id}`, { responseType: "arraybuffer" })
            .then(response => {
                
                return response.data
            })
            .catch(error => handleError(error))
    }
}

export default CDRGettersApi
