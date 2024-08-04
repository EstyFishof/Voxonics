export default {
    state: {
        departmentsForNumbers: [],
        departmentsForWrite: [],
        numbersForView: [],
        inititalNumbers: null,
        initialAvaibleNumbers: null
    },
    actions: {
        addNumbers({ commit }, payload) {
            commit('setNumbers', payload)
        },
        removeNumber({ commit }, payload) {
            commit('deleteNumber', payload)
        },
        setinitialNumbers({ commit }, payload) {
            commit('initialNumbersMutation', payload)
        },
        setInitialAvaibleNumbers({ commit }, payload) {
            commit('initialAvaibleNumbersMutation', payload)
        }
    },
    mutations: {
        getDepartmentsForNumbers(state, payload) {
            state.departmentsForNumbers = payload
        },
        initialNumbersMutation(state, payload) {
            state.inititalNumbers = payload
        },
        initialAvaibleNumbersMutation(state, payload) {
            state.initialAvaibleNumbers = payload
        },
        getNumbersForView(state, payload) {
            state.numbersForView = payload
        },
        setNumbers(state, payload) {
            for (const payloadKey in payload) {
                state.departmentsForNumbers.forEach(dep => {
                    if (dep.uid === payloadKey) {
                        dep.relatedWith.externalNumber = [...new Set([...dep.relatedWith.externalNumber, ...payload[payloadKey]])]
                        const department = {
                            uid: dep.uid,
                            externalNumbers: []
                        }
                        dep.relatedWith.externalNumber.forEach(num => {
                            department.externalNumbers.push(num.uid)
                        })
                        if (!state.departmentsForWrite.filter(d => d.uid === department.uid).length) {
                            state.departmentsForWrite.push(department)
                        } else {
                            state.departmentsForWrite.forEach(dep => {
                                if (dep.uid === payloadKey) {
                                    dep.externalNumbers = department.externalNumbers
                                }
                            })
                        }
                    }
                })
            }
        },
        deleteNumber(state, payload) {
            for (const payloadKey in payload) {
                state.departmentsForNumbers.forEach(dep => {
                    if (dep.uid === payloadKey) {
                        dep.relatedWith.externalNumber = dep.relatedWith.externalNumber.filter(num => num.uid !== payload[payloadKey])

                        const department = {
                            uid: payloadKey,
                            externalNumbers: []
                        }
                        dep.relatedWith.externalNumber.forEach(num => {
                            department.externalNumbers.push(num.uid)
                        })
                        if (!state.departmentsForWrite.filter(d => d.uid === department.uid).length) {
                            state.departmentsForWrite.push(department)
                        } else {
                            state.departmentsForWrite.map(dep => {
                                if (dep.uid === payloadKey) {
                                    dep.externalNumbers = department.externalNumbers
                                }
                            })
                        }
                    }
                })
            }
        },
        clearDepForWrite(state) {
            state.departmentsForWrite = []
        }
    },
    getters: {
        departmentsForNum: state => state.departmentsForNumbers,
        getInitialNumbers: state => state.inititalNumbers,
        numbersForView: state => state.numbersForView,
        uidForWrite: state => state.departmentsForWrite,
        getInitialAvaibleNumbers: state => state.initialAvaibleNumbers
    },
}
