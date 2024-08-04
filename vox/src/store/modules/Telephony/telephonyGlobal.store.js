import { ContactService } from "../../../services/contacts"

export const telephonyGlobal = {
    state: {
        contact: null
    },
    actions: {
        contactAction({commit}, payload) {
            const contact = ContactService.getModifiedInitialContact(payload)
            commit('setContact', contact)
        }
    },
    mutations: {
        setContact(state, payload) {
            state.contact = payload
        }
    },
    getters: {
        getContactFromStore: state => state.contact
    }
}
