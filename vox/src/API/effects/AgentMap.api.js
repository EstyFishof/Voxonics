import { Api, handleError } from "@/API"

const AgentMapEffectsApi = {
    agentMapPreferences(map) {
        return Api().patch('/auth/preferences', {agentMap:map})
            .catch((error) => handleError(error))
    },
}

export default AgentMapEffectsApi
