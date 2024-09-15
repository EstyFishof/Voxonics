const confirmationConfig = (ctx, next) => {
    return {
        execute: () => {next(); ctx.$store.commit('confirmationMutation', null)},
        executeBtnText: 'Leave',
        cancel: () => ctx.$store.commit('confirmationMutation', null),
        cancelBtnText: 'Stay',
        titleText: 'Confirmation',
        textConfirmation: 'You have unsaved changes. Are you sure you want to leave this page?'
    }
}

const isControlPanelChild = (collectionOfChildren) => {
    return collectionOfChildren.filter(el => el.$vnode?.componentOptions?.tag === 'ControlPanel').length
}

export default {
    mounted() {
        if(isControlPanelChild(this.$children)) {
            this.routerBeforeEach = this.$router.beforeEach((to, from, next) => {
                if(this.showApplyBtn) {
                    this.$store.commit('confirmationMutation', confirmationConfig(this, next))
                    next(false)
                } else {
                    return next()
                }
            })
        }

    },
    beforeDestroy() {
        this.routerBeforeEach ? this.routerBeforeEach() : null
    }
}
