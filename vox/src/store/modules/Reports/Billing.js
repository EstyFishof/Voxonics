export default {
    state: {
        statement: {},
        lastPayments: [],
        lastCharges: [],
        // payments: [],
        // charges: [],
        // companyId: ''
    },
    actions: {
        setStatement({ commit }, payload) {
            commit('statementMutation', payload)
        },
        setLastPayments({ commit }, payload) {
            commit('lastPaymentsMutation', payload)
        },
        // setPayments({ commit }, payload) {
        //     commit('paymentsMutation', payload)
        // },
        setLastCharges({ commit }, payload) {
            commit('lastChargesMutation', payload)
        },
        // setCharges({ commit }, payload) {
        //     commit('chargesMutation', payload)
        // }
    },
    mutations: {
        statementMutation(state, payload) {
            state.statement = payload
            localStorage.setItem('getCompanyId', payload.company.uid)
            // state.companyId = payload.company.uid;
        },
        lastPaymentsMutation(state, payload) {
            state.lastPayments = payload
        },
        // paymentsMutation(state, payload) {
        //     state.payments = payload
        // },
        lastChargesMutation(state, payload) {
            state.lastCharges = payload
        },
        // chargesMutation(state, payload) {
        //     state.charges = payload
        // },
    },
    getters: {
        getStatement: state => state.statement,
        getLastPayments: state => state.lastPayments,
        getLastCharges: state => state.lastCharges,
        // getPayments: state => state.payments,
        // getCharges: state => state.charges,
        // getCompanyId: state => state.companyId
    }
}
