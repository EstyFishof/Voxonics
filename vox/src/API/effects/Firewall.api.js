import { Api, handleError } from "@/API"
import store from "@/store"

const FirewallEffectsApi = {
    createIP(obj) {
        return Api().post('/firewalls', obj)
            .then(res => {
                
                store.dispatch('setAddNewFirewallIP', res.data)
            })
            .catch(error => {
                handleError(error)
                throw error
            })
    },
    deleteIP(param) {
        return Api().delete(`/firewalls/${param.uid[0]}`)
            .then(() => {
                
                store.dispatch('setDeleteFirewallIP', param)
                return true 
            })
            .catch(error => {handleError(error)})
    },
    updateIP(ip) {
        return Api().patch(`/firewalls/${ip.uid}`, ip)
            .then(res => {
                
                store.dispatch('setUpdateFirewallIP', res.data)
            })
            .catch(error => {
                handleError(error)
            })
    }
}

export default FirewallEffectsApi
