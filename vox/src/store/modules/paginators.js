export default {
    state: {
        users: { paginator: {}, page: 1, peerPage: 12 },
        departmentsP: { paginator: {}, page: 1, peerPage: 12 },
        queues: { paginator: {}, page: 1, peerPage: 12 },
        numbers: { paginator: {}, page: 1, peerPage: 12 },
        depForNums: { paginator: {}, page: 1, peerPage: 12 },
        payments: { paginator: {}, page: 1, peerPage: 12 },
        charges: { paginator: {}, page: 1, peerPage: 12 },
        whitelistIP: { paginator: {}, page: 1, peerPage: 12},
        leftRoutes: {paginator: {}, page: 1, peerPage: 12 },
        rightRoutes: {paginator: {}, page: 1, peerPage: 12 }
    },
    mutations: {
        //<<<<<<<<<<Departments>>>>>>>>>>>>
        setDepPaginator(state, obj) {
            state.departmentsP.paginator = obj
            state.departmentsP.page = obj.currentPage
            state.departmentsP.peerPage = obj.recordsPerPage
        },
        setDepPage(state, page) {
            state.departmentsP.page = page
        },
        setDepPerPage(state, num) {
            state.departmentsP.peerPage = num
        },
        //<<<<<<<<<<Numbers>>>>>>>>>>>>
        setNumPaginator(state, obj) {
            state.numbers.paginator = obj
            state.numbers.page = obj.currentPage
            state.numbers.peerPage = obj.recordsPerPage
        },
        setNumPage(state, page) {
            state.numbers.page = page
        },
        setNumPerPage(state, num) {
            state.numbers.peerPage = num
        },
        //<<<<<<<<<<Queues>>>>>>>>>>>>
        setQueuePaginator(state, obj) {
            state.queues.paginator = obj
            state.queues.page = obj.currentPage
            state.queues.peerPage = obj.recordsPerPage
        },
        setQueuePage(state, page) {
            state.queues.page = page
        },
        setQueuePerPage(state, num) {
            state.queues.peerPage = num
        },
        //<<<<<<<<<<Users>>>>>>>>>>>>
        setUserPaginator(state, obj) {
            state.users.paginator = obj
            state.users.page = obj.currentPage
            state.users.peerPage = obj.recordsPerPage
        },
        setUserPage(state, page) {
            state.users.page = page
        },
        setUserPerPage(state, num) {
            state.users.peerPage = num
        },
        //<<<<<<<<<<Payments>>>>>>>>>>>>
        setPaymentsPaginator(state, obj) {
            state.payments.paginator = obj
            state.payments.page = obj.currentPage
            state.payments.peerPage = obj.recordsPerPage
        },
        setPaymentsPage(state, page) {
            state.payments.page = page
        },
        setPaymentsPerPage(state, num) {
            state.payments.peerPage = num
        },
        //<<<<<<<<<<Charges>>>>>>>>>>>>
        setChargesPaginator(state, obj) {
            state.charges.paginator = obj
            state.charges.page = obj.currentPage
            state.charges.peerPage = obj.recordsPerPage
        },
        setChargesPage(state, page) {
            state.charges.page = page
        },
        setChargesPerPage(state, num) {
            state.charges.peerPage = num
        },
        //<<<<<<<<<<WhitelistIP>>>>>>>>>>>>
        setWhitelistIPPaginator(state, obj) {
            state.whitelistIP.paginator = obj
            state.whitelistIP.page = obj.currentPage
            state.whitelistIP.peerPage = obj.recordsPerPage
        },
        setWhitelistIPPage(state, page) {
            state.whitelistIP.page = page
        },
        setWhitelistIPPerPage(state, num) {
            state.whitelistIP.peerPage = num
        },
        //<<<<<<<<<<Outbound Routing (left list)>>>>>>>>>>>>
        setLeftRoutesPaginator(state, obj) {
            state.leftRoutes.paginator = obj
            state.leftRoutes.page = obj.currentPage
            state.leftRoutes.peerPage = obj.recordsPerPage
        },
        setLeftRoutesPage(state, page) {
            state.leftRoutes.page = page
        },
        setLeftRoutesPerPage(state, num) {
            state.leftRoutes.peerPage = num
        },
        //<<<<<<<<<<Outbound Routing (right list)>>>>>>>>>>>>
        setRightRoutesPaginator(state, obj) {
            state.rightRoutes.paginator = obj
            state.rightRoutes.page = obj.currentPage
            state.rightRoutes.peerPage = obj.recordsPerPage
        },
        setRightRoutesPage(state, page) {
            state.rightRoutes.page = page
        },
        setRightRoutesPerPage(state, num) {
            state.rightRoutes.peerPage = num
        },
    },
    getters: {
        getPaginatorUsers: state => state.users,
        getPaginatorDepartment: state => state.departmentsP,
        getPaginatorQueues: state => state.queues,
        getPaginatorNumbers: state => state.numbers,
        getPaginatorDepForNums: state => state.depForNums,
        getPaginatorPayments: state => state.payments,
        getPaginatorCharges: state => state.charges,
        getPaginatorWhitelistIP: state => state.whitelistIP,
        getPaginatorLeftRoutes: state => state.leftRoutes,
        getPaginatorRightRoutes: state => state.rightRoutes
    }
}
