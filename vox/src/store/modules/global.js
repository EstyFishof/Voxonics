import {
    UsersGettersApi,
    QueuesGettersApi,
    DepartmentGettersApi,
    NumbersGettersApi,
    ScenarioGettersApi,
    BillingGettersApi,
    FirewallGettersApi
} from '@/API/getters'
import User from '@/API/Global.api'

export default {
    state: {
        globalSearch: {},
        activeLink: '',
        directions: [],
        queues: [],
        externalNumbers: [],
        scenarios: [],
        users: [],
        departments: [],
        routes: [],
        locations: [],
        payments: [],
        charges: [],
        whiteListIP: [],
        spinner: false,
        showPhone: false,
        confirmation: null,
        isFullNavMenu: true
    },
    actions: {
        setGlobalSearch({commit}, payload) {
            commit('globalSearchMutation', payload)
        },
        globalUsersListRequest({commit}, payload) {
            UsersGettersApi.getUsers(payload)
                .then(response => {
                    commit('globalUsersListMutation', response.data.data)
                    commit('setUserPaginator', response.data.paginator)
                })
        },
        setGlobalQueuesList({commit}, payload) {
            QueuesGettersApi.getQueues(payload)
                .then(response => {
                    commit('globalQueuesListMutation', response.data.data)
                    commit('setQueuePaginator', response.data.paginator)
                })
        },
        setGlobalDepartmentsList({commit}, payload) {
            DepartmentGettersApi.getDepartments(payload)
                .then(response => {
                    commit('globalDepartmentsListMutation', response.data.data)
                    commit('setDepPaginator', response.data.paginator)
                })
        },
        setGlobalExternalNumbers({commit}, payload) {
            NumbersGettersApi.getNumbers(payload)
                .then(response => {
                    commit('globalExternalNumbersMutation', response.data.data)
                    commit('setNumPaginator', response.data.paginator)
                })
        },
        setGlobalScenarios({commit}, payload) {
            ScenarioGettersApi.getScenario(payload)
                .then(response => {
                    commit('globalScenariosMutation', response.data.data)
                })
        },
        setGlobalPayments({commit}, payload) {
            BillingGettersApi.getPayments(payload)
                .then(response => {
                    commit('globalPaymentsMutation', response.data.data)
                    commit('setPaymentsPaginator', response.data.paginator)
                })
        },
        setGlobalChanges({commit}, payload) {
            BillingGettersApi.getCharges(payload)
                .then(response => {
                    commit('globalChargesMutation', response.data.data)
                    commit('setChargesPaginator', response.data.paginator)
                })
        },
        setGlobalWhiteListIP({commit}) {
            FirewallGettersApi.getIP()
                .then(response => {
                    commit('globalWhiteListIPMutation', response.data.data.filter( el => el.chain !== 'ssh'))
                    commit('setWhitelistIPPaginator', response.data.paginator)
                })
        },
        setSearchWithoutObservables({commit}, payload) {
            commit('globalSearch', payload)
        },
        setActiveLinkSupport({commit}, payload) {
            commit('activeLinkSupportMutation', payload)
        },
        setDirections({commit}, payload) {
            commit('directionsMutation', payload)
        },
        setGlobalUsersRoutes({commit}, payload) {
            commit('globalUsersRoutesMutation', payload)
        },
        setGlobalLocations({commit}, payload) {
            commit('globalLocationsMutation', payload)
        },
        setSpinner({commit}, payload) {
            commit('spinnerMutation', payload)
        },
        getUserInfo({dispatch}) {
            return User.getUserInfo()
                .then((response) => {
                    response.headers?.['x-time'] && sessionStorage.setItem('x-time', response.headers['x-time'] + '000')
                    if (!sessionStorage.getItem('offsetTime')) {
                        sessionStorage.setItem('offsetTime', Date.now() - sessionStorage.getItem('x-time'))
                    }
                    dispatch('pushUserInfo', response.data)
                    dispatch('getRoleForDisplay', response.data.permission.role)
                    localStorage.setItem('role', response.data.permission.role)
                    if (!this.getters.getCountry?.length && response.data.permission.role !== 'agent') {
                        User.getCountry()
                    }
                })
        }
    },
    mutations: {
        globalSearch(state, payload) {
            state.globalSearch = payload
        },
        globalSearchMutation(state, payload) {
            state.globalSearch = payload
        },
        globalQueuesListMutation(state, payload) {
            state.queues = payload
        },
        globalUsersListMutation(state, payload) {
            state.users = payload
        },
        activeLinkSupportMutation(state, payload) {
            state.activeLink = payload
        },
        directionsMutation(state, payload) {
            state.directions = payload
        },
        globalPaymentsMutation(state, payload) {
            state.payments = payload
        },
        globalChargesMutation(state, payload) {
            state.charges = payload
        },
        globalWhiteListIPMutation(state, payload) {
            state.whiteListIP = payload
        },
        globalExternalNumbersMutation(state, payload) {
            state.externalNumbers = payload
        },
        globalScenariosMutationv(state, payload) {
            state.scenarios = payload
        },
        globalDepartmentsListMutation(state, payload) {
            state.departments = payload
        },
        globalUsersRoutesMutation(state, payload) {
            state.routes = payload
        },
        globalLocationsMutation(state, payload) {
            state.locations = payload
        },
        spinnerMutation(state, payload) {
            state.spinner = payload
        },
        showPhoneMutation(state, payload) {
            state.showPhone = payload
        },
        confirmationMutation(state, payload) {
            state.confirmation = payload
        },
        isFullNavMenuMutation(state, payload) {
            state.isFullNavMenu = payload
        }
    },
    getters: {
        getGlobalSearch: state => state.globalSearch,
        getGlobalUsersList: state => state.users,
        getGlobalQueuesList: state => state.queues,
        getActiveLinkSupport: state => state.activeLink,
        getDirections: state => state.directions,
        getGlobalExternalNumbers: state => state.externalNumbers,
        getGlobalScenarios: state => state.scenarios,
        getGlobalDepartments: state => state.departments,
        getGlobalUsersRoutes: state => state.routes,
        getGlobalLocations: state => state.locations,
        getGlobalSpinner: state => state.spinner,
        getGlobalPayments: state => state.payments,
        getGlobalCharges: state => state.charges,
        getGlobalWhiteListIP: state => state.whiteListIP,
        getShowPhone: state => state.showPhone,
        getGlobalConfirmation: state => state.confirmation,
        getIsFullNavMenu: state => state.isFullNavMenu
    }
}
