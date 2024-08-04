import { Api, handleError } from "@/API"
// import store from "@/store"

const FirewallGettersApi = {
    getIP() {
        return Api().get('/firewalls?per-page=100')
            // .then(res => {
                
            //     store.dispatch('setListFirewall', JSON.parse(JSON.stringify(res.data.data)))
            //     store.dispatch('setInitialListFirewall', JSON.parse(JSON.stringify(res.data.data)))
            //     store.dispatch('getWhitelistIPPaginator', res.data.paginator)
            // })
            .catch(error => {handleError(error)})
    },
}

export default FirewallGettersApi
