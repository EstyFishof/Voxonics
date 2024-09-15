export default {
    state: {
        cdr: [],
        paginator: {},
        users: [],
        'per-page': '12',
        page: '1',
        country: []
    },
    actions: {
        setCDR({ commit }, payload) {
            commit('cdrMutation', payload)
        },
        setPaginatorCDR({ commit }, payload) {
            commit('paginatorCDRMutation', payload)
        },
        setUsersCDR({ commit }, payload) {
            commit('userCDRMutation', payload)
        },
        // setPageCDR({ commit }, payload) {
        //     commit('pageCDRMutation', payload)
        // },
        // setPeerPageCDR({ commit }, payload) {
        //     commit('peerPageCDRMutation', payload)
        // },
        setCountry({ commit }, payload) {
            commit('setCountryMutation', payload)
        }
    },
    mutations: {
        cdrMutation(state, payload) {
            state.cdr = payload
        },
        paginatorCDRMutation(state, payload) {
            state.paginator = payload
            // state.paginator.currentPage = JSON.parse(JSON.stringify(+state.page))
            // state.paginator.recordsPerPage = JSON.parse(JSON.stringify(state['per-page']))
        },
        userCDRMutation(state, payload) {
            payload.forEach(element => {
                element.internalNumber = `${element.internalNumber}`
            })
            state.users = payload
        },
        pageCDRMutation(state, payload) {
            state.page = payload
        },
        peerPageCDRMutation(state, payload) {
            state['per-page'] = payload
        },
        setCountryMutation(state, payload) {
            state.country = payload
        },
        resetReportsCDR(state) {
            state.paginator = {}
            state.cdr = []
            state.page = 1
            state['per-page'] = 12
        }
    },
    getters: {
        getCDR: state => state.cdr,
        getPaginatorCDR: state => state.paginator,
        getUsersCDR: state => state.users,
        getPageCDR: state => state.page,
        getPeerPageCDR: state => state['per-page'],
        getCountry: state => state.country
    }
}
