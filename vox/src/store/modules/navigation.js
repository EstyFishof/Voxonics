export default {
    state: {
        path: [],
        isPage: false,
        title: '',
        icon: '',
        theme: '',
        currentRoutes: 'client'
    },
    actions: {
        getPath({commit}, arr) {
            commit('setPath', arr)
        },
        getIsPage({commit}, bool) {
            commit('setIsPage', bool)
        }
    },
    mutations: {
        setCurrentRoutes(state, mode) {
            state.currentRoutes = mode
        },
        setPath(state, arr) {
            state.path = arr
        },
        setIsPage(state, bool) {
            state.isPage = bool
        },
        setMeta(state, data) {
            state.title = data.title
            state.icon = data.icon
        },
        toggleTheme(state, val) {
            const html = document.documentElement
            const theme = html.getAttribute('theme')
            if(val === 'init') {
                html.setAttribute('theme', localStorage.getItem('theme'))
                localStorage.setItem('theme', localStorage.getItem('theme'))
                state.theme = localStorage.getItem('theme')
                return
            }

            if (theme === 'dark') {
                html.setAttribute('theme', 'light')
                localStorage.setItem('theme', 'light')
                state.theme = 'light'
            } else {
                html.setAttribute('theme', 'dark')
                localStorage.setItem('theme', 'dark')
                state.theme = 'dark'
            }
        }

    },
    getters: {
        pathLocation: state => state.path,
        isPage: state => state.isPage,
        title: state => state.title,
        icon: state => state.icon,
        currentRoutes: state => state.currentRoutes,
        theme: state => state.theme
    }
}
