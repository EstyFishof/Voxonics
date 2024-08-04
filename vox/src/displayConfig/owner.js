export default {
    mainNavigation: {
        showManagersRoutes: true,
        showWhiteListIp: true
    },
    createUser: {
        agentSetup: {
            listRoles: ['agent', 'manager', 'admin'],
            disableRoles: ['root', 'owner']
        },
        permissionsDisabled: ['admin', 'owner', 'root']
    }
}
