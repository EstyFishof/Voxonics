export default {
    mainNavigation: {
        showManagersRoutes: true,
        showWhiteListIp: true
    },
    createUser: {
        agentSetup: {
            listRoles: ['agent', 'manager', 'admin', 'owner'],
            disableRoles: []
        },
        permissionsDisabled: ['admin', 'owner', 'root']
    }
}
