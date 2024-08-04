export default {
    user: [
        // 'pushAva',
        'pushField',
        'addSelectedQueues',
        'setDeps',
        'setNewRole',
        'setVNumber',
        'userDepsManaged',
        'userQueuesManaged',
        'setPermissionCDRMutation',
        'viewBillingReportsMutatution',
        'editQueueMutation'
    ],
    departments: [
        'pushNameDepartment',
        'pushAgentsDepartment',
        'pushManagersDepartment',
        'pushNumbersDepartment',
    ],
    queues: [
        'strategyMutation',
        'timeoutMutation',
        'ringinuseMutation',
        'waitMutation',
        'queueNameInfoMutation',
        'strategyInfoMutaion',
        'timeoutInfoMutation',
        'ringInUseInfoMutation',
        'maxWaitInfoMutation',
        'agentsQueueInfoMutation',
        'managersQueueInfoMutation',
        'updateQueuesInListMutation'
    ],
    numbers: [
        'setNumbers',
        'deleteNumber',
    ],
    paginator: {
        CDR: ['pageCDRMutation', 'peerPageCDRMutation'],
        departments: ['setDepPage', 'setDepPerPage'],
        users: ['setUserPage', 'setUserPerPage'],
        queues: ['setQueuePage', 'setQueuePerPage'],
        numbers: ['setNumPage', 'setNumPerPage'],
        depForNums: ['setDepPage', 'setDepPerPage'],
        payments: ['setPaymentsPage', 'setPaymentsPerPage'],
        charges: ['setChargesPage', 'setChargesPerPage'],
        leftRoutes: ['setLeftRoutesPage', 'setLeftRoutesPerPage'],
        rightRoutes: ['setRightRoutesPage', 'setRightRoutesPerPage']
    },
    scenarios: [
        'itemScenariosMutation',
        'deleteItemMutation',
        'changeNameScenarioMutation',
        'newScenarioMutation',
        'isSwappedModeMutation',
        'listScenariosMutationWithObservers',
        'arrayUidsOfDeleteScenariosMutation',
        'listScenariosMutationAfterChangeName',
        'arrayOfScenariosWithChangedNameMutation'
    ],
}
