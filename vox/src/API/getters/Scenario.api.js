import { Api, handleError } from "@/API"
import store from "../../store"

const ScenarioGettersApi = {
    getScenario() {
        return Api().get('/scenarios')
    },
    getInvolvedNumbers() {
        return Api().get('/scenarios/extenal-numbers')
            .catch(handleError)
    }
}

export default ScenarioGettersApi
