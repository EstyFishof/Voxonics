import { Api, handleError } from "@/API"

const NumberEffectsApi = {
    updateNumber(id, description) {
        return Api().patch(`external-numbers/${id}`, JSON.stringify(description), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                
                return response.data
            })
            .catch((error) => {
                handleError(error)
                throw(error)
            })
    }
}

export default NumberEffectsApi
