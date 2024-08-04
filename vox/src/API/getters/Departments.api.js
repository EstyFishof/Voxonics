import { Api, handleError } from "@/API"
import store from "@/store"
import QueryParameters from '../QueryParameters'

const DepartmentGettersApi = {
    getDepartments(config) {
        const {peerPage, sort, page, search, order} = new QueryParameters(config)
        return Api().get(`/departments/manage?&with-full-append&per-page=${peerPage}&sort=${sort}&page=${page}&order=${order}&search=${search}&externalNumber={"begin": "${config.externalNumber || ''}"}`)
            .catch((error) => handleError(error))
    },
    viewDepartment(uid) {
        return Api().get(`/departments/${uid}?with-full-append`)
            .then(response => {
                
                store.dispatch('setInitialDep', JSON.parse(JSON.stringify(response.data)))
                store.dispatch('getDepartmentInfo', response.data)
                return response.data
            })
            .catch((error) => handleError(error))
    },
}

export default DepartmentGettersApi
