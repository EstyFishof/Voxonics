import { Api, handleError } from "@/API"
import store from "@/store"
import router from "../../router"

const DepartmentEffectsApi = {
    createDepartment(dep) {
        return Api().post('/departments', JSON.stringify({ ...dep }), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                
                store.dispatch('resetCreateDep')
                return router.push('/config/departments')
            })
            .catch((error) => handleError(error))
    },
    updateDepartment(dep) {
        return Api().patch(`/departments/${dep.uid}?with-full-append`, dep)
            .then(response => {
                
                store.dispatch('getDepartmentInfo', response.data)
                store.dispatch('setInitialDep', JSON.parse(JSON.stringify(response.data)))
                return response.data
            })
            .catch((error) => {
                handleError(error)
                store.dispatch('getDepartmentInfo', JSON.parse(JSON.stringify(store.getters.getInitialDep)))
            })
    },
    deleteDepartment(uid) {
        return Api().delete(`/departments/${uid}`)
            .then(() => {
                
                return router.push('/config/departments')
            })
            .catch((error) => handleError(error))
    },
}
export default DepartmentEffectsApi
