import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import http from './modules/http'
import createUser from "@/store/modules/Config/createUser"
import userInfo from "@/store/modules/Config/userInfo"
import navigation from '@/store/modules/navigation'
import paginators from '@/store/modules/paginators'
import createDepartment from "@/store/modules/Config/createDepartment"
import departmentInfo from "./modules/Config/departmentInfo"
import queues from '@/store/modules/Config/queues'
import createQueue from '@/store/modules/createQueue'
import numbers from "./modules/Config/numbers"
import queueInfo from './modules/Config/queueInfo'
import CDR from './modules/Reports/reports'
import Billing from './modules/Reports/Billing'
import scenario from './modules/Config/scenario'
import global from './modules/global'
import firewall from './modules/Config/firewall'
import routes from './modules/Config/routes'
import displayConfig from "./modules/displayConfig"
import agentPanel from "./modules/agentPanel.store"
import agentPanelDisplay from './modules/agentPanelDisplay'
import agentMap from "./modules/agentMap.store"
import {UserAgent} from '@/store/modules/Telephony/UserAgent/UserAgent.store'
import {deviceManager} from '@/store/modules/Telephony/deviceManager.store'
import department from '@/store/modules/Config/department.store'
import {Connection} from './modules/Telephony/Connection/Connection.store'
import {Session} from './modules/Telephony/Session/Session.store'
import {telephonyGlobal} from './modules/Telephony/telephonyGlobal.store'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        http,
        createUser,
        userInfo,
        createDepartment,
        navigation,
        departmentInfo,
        queues,
        createQueue,
        numbers,
        queueInfo,
        CDR,
        scenario,
        paginators,
        Billing,
        global,
        firewall,
        routes,
        displayConfig,
        agentPanel,
        agentMap,
        UserAgent,
        Session,
        Connection,
        department,
        deviceManager,
        agentPanelDisplay,
        telephonyGlobal
    }
})

if (process.env.VUE_APP_REMOTE_ADMIN_URL) {
    import('admin/adminStore')
        .then(data => {
            for (const dataKey in data.default) {
                store.registerModule(dataKey, data.default[dataKey])
            }
        })
}


export default store
