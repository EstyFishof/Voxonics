import { Api, handleError } from './index'
import store from '@/store'

export const AuthApi = {
    login(form) {
        return Api().post("login/", form)
            .catch(error => {
                store.commit('logout')
                handleError(error)
            })
    },
    logout() {
        return Api().get('logout')
    },
    changeSelf(form) {
        return Api().patch('auth', form)
    }
}
