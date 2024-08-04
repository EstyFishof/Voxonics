export default {
    mainNavigation: {
        showManagersRoutes: true,
        showWhiteListIp: false
    },
    createUser: {
        agentSetup: {
            listRoles: ['agent'],
            disableRoles: ['admin', 'owner', 'root', 'manager']
        },
        permissionsDisabled: ['admin', 'owner', 'root']
    }
}
