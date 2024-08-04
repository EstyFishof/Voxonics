export default {
    mainNavigation: {
        showManagersRoutes: true,
        showWhiteListIp: false
    },
    createUser: {
        agentSetup: {
            listRoles: ['agent', 'manager'],
            disableRoles: ['owner', 'root', 'admin']
        },
        permissionsDisabled: ['admin', 'owner', 'root']
    }
}
