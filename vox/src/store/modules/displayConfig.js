import displayConfig from "../../displayConfig"

export default {
    state: {roleUser: "agent", displayConfig: displayConfig.agent},
    actions: {
        getRoleForDisplay({commit}, payload) {
            commit("writeRoleForDisplay", payload)
        }
    },
    mutations: {
        writeRoleForDisplay(state, payload) {
            state.roleUser = payload
            state.displayConfig = displayConfig[payload]
        }
    },
    getters: {
        displayConfig: state => state.displayConfig
    }
}

