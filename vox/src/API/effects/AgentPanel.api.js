import { Api, handleError } from "@/API"

const AgentPanelEffectsApi = {
    onPause() {
        return Api().patch(`auth/pause/`)
            .then((response) => {
                return response.data.onPause
            })
            .catch(error => {
                handleError(error)
            })
    }
}

export default AgentPanelEffectsApi
