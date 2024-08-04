import { Api, handleError } from "@/API"
import scenarioGetters from '../getters/Scenario.api'
import store from "../../store"

const ScenarioEffectsApi = {
    updateScenario(scenario) {
        return Api().patch(`/scenarios/${scenario.uid}`, scenario)
            .catch(error => {
                handleError(error) 
                scenarioGetters.getScenario()
                store.dispatch('setScenario', {...store.getters.getInitialScenario})
            })
    },
    createScenario(scenario) {
        return Api().post('/scenarios', scenario)
            .catch(error => {handleError(error); scenarioGetters.getScenario()})
    },
    deleteScenario(uid) {
        return Api().delete(`/scenarios/${uid}`)
            .catch(error => {handleError(error); scenarioGetters.getScenario()})
    }
}

export default ScenarioEffectsApi
