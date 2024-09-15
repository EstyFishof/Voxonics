import {DepartmentGettersApi} from '@/API/getters'
import router from '../../../router'

export default {
    actions: {
        setViewDepartmetn(state, dep) {
            DepartmentGettersApi.viewDepartment(dep.uid)
            localStorage.setItem('depUid', dep.uid)
            router.push(`/config/departments/department-setting/${dep.name}`)
        },
        goToAddNewDepartmentPage() {
            router.push("/config/departments/create-department")
        }
    }
}
