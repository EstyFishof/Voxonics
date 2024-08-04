export default {
    state: {
        errorMessage: "",
        successMessage: "",
        abortControllerPool: []
    },
    actions: {
        emitError({commit}, payload) {
            if (typeof payload === "string") {
                commit('writeError', payload)
            } else {
                let str = ''
                for (const payloadKey in payload) {
                    if (Array.isArray(payload[payloadKey])) {
                        payload[payloadKey].forEach( el => str += el + "\n")
                    } else {
                        str += payload[payloadKey] + "\n"
                    }
                }
                commit('writeError', str)
            }

        },
        emitSuccess({commit}, str) {
            commit('writeSuccess', str)
        },
        emitClearError({commit}) {
            commit('clearError')
        } ,
        emitClearSuccess({commit}) {
            commit('clearSuccess')
        }
    },
    mutations: {
        writeError(state, payload) {
            state.errorMessage = payload
        },
        writeSuccess(state, payload) {
            state.successMessage = payload
        },
        clearError(state) {
            state.errorMessage = ""
        }  ,
        clearSuccess(state) {
            state.successMessage = ""
        },
        addAbortController(state, controllerInstance) {
             if (!state.abortControllerPool.find(el => el === controllerInstance)) {
                 state.abortControllerPool.push(controllerInstance)
             }
        },
        removeAbortController(state, controllerInstance) {
            if (state.abortControllerPool.find(el => el === controllerInstance)) {
                state.abortControllerPool = state.abortControllerPool.filter(el => el !== controllerInstance)
            }
        }
    },
    getters: {
        errorMsg: state => state.errorMessage,
        successMsg: state => state.successMessage,
        abortControllerPool: state => state.abortControllerPool,
    }
}
