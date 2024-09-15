import VueRouter from 'vue-router';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CreateDepartment from '../../../src/store/modules/Config/createDepartment';
import departmentInfo from '../../../src/store/modules/Config/departmentInfo';
import queueInfo from '../../../src/store/modules/Config/queueInfo';
import queues from '../../../src/store/modules/Config/queues';
import userInfo from '../../../src/store/modules/Config/userInfo';
import createUser from '../../../src/store/modules/Config/createUser';
import api from '../../../src/store/modules/http';
import auth from '../../../src/store/modules/auth';
import createQueue from '../../../src/store/modules/createQueue';
import navigation from '../../../src/store/modules/navigation';
import numbers from '../../../src/store/modules/Config/numbers';
import billing from '../../../src/store/modules/Reports/Billing';
import report from '../../../src/store/modules/Reports/reports';
import scenario from '../../../src/store/modules/Config/scenario';
import global from '../../../src/store/modules/global';
import firewall from '../../../src/store/modules/Config/firewall';
import mockBilling from './__mock__/billing';
import mockScenario from './__mock__/scenario';

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(Vuex);

describe('CreateDepartment', () => {
    const actions = CreateDepartment.actions;
    const state = CreateDepartment.state;
    const mutations = CreateDepartment.mutations;
    const getters = CreateDepartment.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(CreateDepartment).toMatchSnapshot();
        // console.log({'actions effects' : store.getters.numbers});
        // console.log({'actions effects' : store._mutations.setNumbers});
        // console.log({'actions store': store._actions.getNumbers});
    });
    it('Check state property', () => {
        expect(CreateDepartment).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(CreateDepartment).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(CreateDepartment).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(CreateDepartment).toHaveProperty('getters');
    });
    it('Check getNumbers', async() => {
        await store.dispatch('getNumbers', [1, 2]);
        await expect(store.getters.numbers).toStrictEqual([1, 2]);
    });
    it('Check transferNameDepartment', async() => {
        await store.dispatch('transferNameDepartment', 'Kirill');
        await expect(store.getters.newDepartmentName).toStrictEqual('Kirill');
    });
    it('Check transferAgentsDepartment', async() => {
        await store.dispatch('transferAgentsDepartment', [1, 2]);
        await expect(store.getters.newDepartmentAgents).toStrictEqual([1, 2]);
    });
    it('Check transferManagersDepartment', async() => {
        await store.dispatch('transferManagersDepartment', [1, 2]);
        await expect(store.getters.newDepartmentManagers).toStrictEqual([1, 2]);
    });
    it('Check transferNumberDepartment', async() => {
        await store.dispatch('transferNumberDepartment', [1, 2]);
        await expect(store.getters.newDepartmentNumbers).toStrictEqual([1, 2]);
    });
    it('Check getStaff agent', async() => {
        await store.dispatch('getStaff', [{
            name: 'a',
            permission: {
                role: 'agent'
            }
        }]);
        await expect(store.getters.agents).toStrictEqual([{
            name: 'a',
            permission: {
                role: 'agent'
            }
        }]);
    });
    it('Check getStaff agent', async() => {
        await store.dispatch('getStaff', [{
            name: 'a',
            permission: {
                role: 'manager'
            }
        }]);
        await expect(store.getters.managers).toStrictEqual([{
            name: 'a',
            permission: {
                role: 'manager'
            }
        }]);
    });
    it('Check transferNumberDepartment', async() => {
        await store.dispatch('resetCreateDep');
        await expect(store.getters.newDepartment).toStrictEqual({
            name: "",
            relatedWith: {
                externalNumberUid: [],
                userUid: []
            },
            belongTo: []
        });
    });
});

describe('departmentInfo', () => {
    const actions = departmentInfo.actions;
    const state = departmentInfo.state;
    const mutations = departmentInfo.mutations;
    const getters = departmentInfo.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(departmentInfo).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(departmentInfo).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(departmentInfo).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(departmentInfo).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(departmentInfo).toHaveProperty('getters');
    });
    it('Check getDepartmentInfo', async() => {
        await store.dispatch('getDepartmentInfo', {
            name: "a",
            relatedWith: {
                externalNumber: [],
                user: []
            },
            belongTo: { user: [] }
        });
        await expect(store.getters.departmentInfo).toStrictEqual({
            name: "a",
            relatedWith: {
                externalNumber: [],
                user: []
            },
            belongTo: { user: [] }
        });
    });
    it('Check changeNameDepartment', async() => {
        await store.dispatch('changeNameDepartment', 'Kirill');
        await expect(store.getters.departmentInfoName).toStrictEqual('Kirill');
    });
    it('Check changeAgentsDepartment', async() => {
        await store.dispatch('changeAgentsDepartment', [1, 2]);
        await expect(store.getters.agentsDep).toStrictEqual([1, 2]);
    });
    it('Check changeManagersDepartment', async() => {
        await store.dispatch('changeManagersDepartment', [1, 2]);
        await expect(store.getters.managersDep).toStrictEqual([1, 2]);
    });
    it('Check changeNumbersDepartment', async() => {
        await store.dispatch('changeNumbersDepartment', [1, 2]);
        await expect(store.getters.numbersDep).toStrictEqual([1, 2]);
    });
});

describe('queueInfo', () => {
    const actions = queueInfo.actions;
    const state = queueInfo.state;
    const mutations = queueInfo.mutations;
    const getters = queueInfo.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(queueInfo).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(queueInfo).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(queueInfo).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(queueInfo).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(queueInfo).toHaveProperty('getters');
    });
    it('Check setQueueInfo', async() => {
        await store.dispatch('setQueueInfo', {
            name: 'a',
            strategy: 'ringAll',
            timeout: '10',
            ringinuse: 'yes',
            maxwait: '10',
            relatedWith: {
                user: []
            },
            belongTo: {
                user: []
            }
        });
        await expect(store.getters.getQueueInfo).toStrictEqual({
            name: 'a',
            strategy: 'ringAll',
            timeout: '10',
            ringinuse: 'yes',
            maxwait: '10',
            relatedWith: {
                user: []
            },
            belongTo: {
                user: []
            }
        });
    });
    it('Check setQueueNameInfo', async() => {
        await store.dispatch('setQueueNameInfo', 'Kirill');
        await expect(store.getters.getQueueNameInfo).toStrictEqual('Kirill');
    });
    it('Check setStrategyInfo', async() => {
        await store.dispatch('setStrategyInfo', 'RingAll');
        await expect(store.getters.getStrategyInfo).toStrictEqual('RingAll');
    });
    it('Check setTimeoutInfo', async() => {
        await store.dispatch('setTimeoutInfo', 10);
        await expect(store.getters.getTimeoutInfo).toStrictEqual(10);
    });
    it('Check setRingInUseInfo', async() => {
        await store.dispatch('setRingInUseInfo', 'yes');
        await expect(store.getters.getRingInUseInfo).toStrictEqual('yes');
    });
    it('Check setMaxWaitInfo', async() => {
        await store.dispatch('setMaxWaitInfo', 10);
        await expect(store.getters.getMaxWaitInfo).toStrictEqual('10');
    });
    it('Check setAgentsQueueInfo', async() => {
        await store.dispatch('setAgentsQueueInfo', [1, 2]);
        await expect(store.getters.getAgentsQueueInfo).toStrictEqual([1, 2]);
    });
    it('Check setMagagersQueueInfo', async() => {
        await store.dispatch('setMagagersQueueInfo', [1, 2]);
        await expect(store.getters.getManagersQueueInfo).toStrictEqual([1, 2]);
    });
    it('Check setDeleteQueueInfo', async() => {
        await store.dispatch('setDeleteQueueInfo', true);
        await expect(store.getters.getDeleteQueueInfo).toStrictEqual(true);
    });
});

describe('queues', () => {
    const actions = queues.actions;
    const state = queues.state;
    const mutations = queues.mutations;
    const getters = queues.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(queues).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(queues).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(queues).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(queues).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(queues).toHaveProperty('getters');
    });
    it('Check setQueues', async() => {
        await store.dispatch('setQueues', [1, 2]);
        await expect(store.getters.queuesListManage).toStrictEqual([1, 2]);
    });
    it('Check setPaginator', async() => {
        await store.dispatch('setPaginator', [1, 2]);
        await expect(store.getters.paginatorListManage).toStrictEqual([1, 2]);
    });
    it('Check setStrategy', async() => {
        await store.dispatch('setQueues', [{
            uid: 111,
            strategy: 'a'
        }]);
        await store.dispatch('setStrategy', {
            uid: 111,
            value: 'RingAll'
        });
        await expect(store.getters.queuesListManage[0]).toStrictEqual({
            uid: 111,
            strategy: 'RingAll'
        });
    });
    it('Check setTimeout', async() => {
        await store.dispatch('setQueues', [{
            uid: 111,
            timeout: '1'
        }]);
        await store.dispatch('setTimeout', {
            uid: 111,
            value: '10'
        });
        await expect(store.getters.queuesListManage[0]).toStrictEqual({
            uid: 111,
            timeout: '10'
        });
    });
    it('Check setRinginuse', async() => {
        await store.dispatch('setQueues', [{
            uid: 111,
            ringinuse: 'no'
        }]);
        await store.dispatch('setRinginuse', {
            uid: 111,
            value: 'yes'
        });
        await expect(store.getters.queuesListManage[0]).toStrictEqual({
            uid: 111,
            ringinuse: 'yes'
        });
    });
    it('Check setWait', async() => {
        await store.dispatch('setQueues', [{
            uid: 111,
            penaltymemberslimit: '1'
        }]);
        await store.dispatch('setWait', {
            uid: 111,
            value: '10'
        });
        await expect(store.getters.queuesListManage[0]).toStrictEqual({
            uid: 111,
            penaltymemberslimit: '10'
        });
    });
});

describe('userInfo', () => {
    const actions = userInfo.actions;
    const state = userInfo.state;
    const mutations = userInfo.mutations;
    const getters = userInfo.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(userInfo).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(userInfo).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(userInfo).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(userInfo).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(userInfo).toHaveProperty('getters');
    });
    it('Check setViewUser', async() => {
        await store.dispatch('setViewUser', {
            user: {
                name: "Kirill",
                internalNumber: "111",
                position: "Manager",
                email: "k@gmail.com",
                phone: "111",
                avatar: "",
                location: "",
                password: "111",
                confirm: "",
                permission: {
                    role: "",
                },
                route: [
                    {
                        externalNumberUid: "",
                        directionId: "",
                        priority: 1,
                        allowed: true
                    }
                ],
                relatedWith: {
                    departmentUid: [],
                    queue: []
                },
                manage: {
                    department: [],
                    queue: []
                }
            },
            uid: 111,
            array: [],
        });
        await expect(store.getters.userInfoVuex).toStrictEqual({
            name: "Kirill",
            internalNumber: "111",
            position: "Manager",
            email: "k@gmail.com",
            phone: "111",
            avatar: "",
            location: "",
            password: "111",
            confirm: "",
            permission: {
                role: "",
            },
            route: [
                {
                    externalNumberUid: "",
                    directionId: "",
                    priority: 1,
                    allowed: true
                }
            ],
            relatedWith: {
                department: [],
                departmentUid: [],
                queue: []
            },
            manage: {
                department: [],
                queue: []
            }
        });
    });
    // it('Check successUserUpdate', async() => {
    //     await store.dispatch('successUserUpdate', 'Kirill')
    // })
    it('Check changeUserInfo', async() => {
        await store.dispatch('changeUserInfo', {name: 'Oleg'});
        await expect(store.getters.userInfoVuex.name).toStrictEqual('Oleg');
    });
    it('Check setAva', async() => {
        await store.dispatch('setAva', 'url');
        await expect(store.getters.userAva).toStrictEqual('url');
    });
    it('Check usersQueuesSelected', async() => {
        await store.dispatch('usersQueuesSelected', [{uid: 111, name: 'queue'}]);
        await expect(store.getters.userQueues).toStrictEqual([{uid: 111, name: 'queue'}]);
    });
    it('Check toggleEditMode', async() => {
        await store.dispatch('toggleEditMode', true);
        await expect(store.getters.editMode).toStrictEqual(true);
    });
    it('Check changeDeps', async() => {
        await store.dispatch('changeDeps', [1, 2]);
        await expect(store.getters.departments).toStrictEqual([1, 2]);
    });
    it('Check changeRole', async() => {
        await store.dispatch('changeRole', 'Manager');
        await expect(store.getters.userRole).toStrictEqual('Manager');
    });
    it('Check setUserDepsManaged', async() => {
        await store.dispatch('setUserDepsManaged', [1, 2]);
        await expect(store.getters.userManageDeps).toStrictEqual([1, 2]);
    });
    it('Check setUserQueuesManaged', async() => {
        await store.dispatch('setUserQueuesManaged', [1, 2]);
        await expect(store.getters.userManageQueues).toStrictEqual([1, 2]);
    });
});

describe('createUser', () => {
    const actions = createUser.actions;
    const state = createUser.state;
    const mutations = createUser.mutations;
    const getters = createUser.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(createUser).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(createUser).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(createUser).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(createUser).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(createUser).toHaveProperty('getters');
    });
    it('Check listSearchUsers', async() => {
        await store.dispatch('listSearchUsers', [1, 2]);
        await expect(store.getters.getSearchUsers).toStrictEqual([1, 2]);
    });
    it('Check queuesRelated', async() => {
        await store.dispatch('queuesRelated', [1, 2]);
        await expect(store.getters.getRelatedQueues).toStrictEqual([1, 2]);
    });
    it('Check queuesSelected', async() => {
        await store.dispatch('queuesSelected', [{uid: 111}]);
        await expect(store.getters.getSelectedQueues).toStrictEqual([{uid: 111}]);
    });
    it('Check departmentsRelated', async() => {
        await store.dispatch('departmentsRelated', [1, 2]);
        await expect(store.getters.getRelatedDepartments).toStrictEqual([1, 2]);
    });
    it('Check departmentsSelected', async() => {
        await store.dispatch('departmentsSelected', [{uid: 111}]);
        await expect(store.getters.getSelectedDepartments).toStrictEqual([{uid: 111}]);
    });
    it('Check setAvatar', async() => {
        await store.dispatch('setAvatar', 'url');
        await expect(store.getters.getAvatar).toStrictEqual('url');
    });
    it('Check setUserInfo', async() => {
        await store.dispatch('setUserInfo', {name: 'Kirill'});
        await expect(store.getters.getForm.name).toStrictEqual('Kirill');
    });
    it('Check setOutboundDirection', async() => {
        await store.dispatch('setOutboundDirection', [{uid: 111}]);
        await expect(store.getters.getOutboundDirection).toStrictEqual([{uid: 111}]);
    });
    it('Check setOutInfo', async() => {
        await store.dispatch('setOutInfo', [1, 2]);
        await expect(store.getters.outInfo).toStrictEqual([1, 2]);
    });
    it('Check setVNumber', async() => {
        await store.dispatch('setVNumber', '066');
        await expect(store.getters.VNumber).toStrictEqual('066');
    });
    it('Check setRole', async() => {
        await store.dispatch('setRole', 'Manager');
        await expect(store.getters.getRole).toStrictEqual('Manager');
    });
    it('Check depManagerSelected', async() => {
        await store.dispatch('depManagerSelected', [{uid: 111, edit: true}]);
        await expect(store.getters.getDepManaged).toStrictEqual([{uid: 111, edit: true}]);
    });
    it('Check queueManagerSelected', async() => {
        await store.dispatch('queueManagerSelected', [{uid: 111, edit: true}]);
        await expect(store.getters.getQueueManaged).toStrictEqual([{uid: 111, edit: true}]);
    });
    it('Check reset', async() => {
        await store.dispatch('reset');
    });
});

describe('api', () => {
    const actions = api.actions;
    const state = api.state;
    const mutations = api.mutations;
    const getters = api.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(api).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(api).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(api).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(api).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(api).toHaveProperty('getters');
    });
    it('Check emitError', async() => {
        await store.dispatch('emitError', 'error');
        await expect(store.getters.errorMsg).toStrictEqual('error');
    });
    it('Check emitError', async() => {
        await store.dispatch('emitError', {msg: 'error'});
        await expect(store.getters.errorMsg).toStrictEqual('error\n');
    });
    it('Check emitSuccess', async() => {
        await store.dispatch('emitSuccess', 'Success');
        await expect(store.getters.successMsg).toStrictEqual('Success');
    });
    it('Check emitClearError', async() => {
        await store.dispatch('emitClearError');
        await expect(store.getters.errorMsg).toStrictEqual('');
    });
    it('Check emitClearSuccess', async() => {
        await store.dispatch('emitClearSuccess');
        await expect(store.getters.successMsg).toStrictEqual('');
    });
});

describe('auth', () => {
    const actions = auth.actions;
    const state = auth.state;
    const mutations = auth.mutations;
    const getters = auth.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(auth).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(auth).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(auth).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(auth).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(auth).toHaveProperty('getters');
    });
    it('Check sendReqLogin', async() => {
        await store.dispatch('sendReqLogin');
        await expect(store.getters.authStatus).toStrictEqual('load');
    });
    it('Check logged', async() => {
        await store.dispatch('logged');
        await expect(store.getters.authStatus).toStrictEqual('success');
    });
    it('Check pushUserInfo', async() => {
        await store.dispatch('pushUserInfo', {udi: 111, role: 'Manager', permission: {role: 'agent'}});
        await expect(store.getters.userInfo).toStrictEqual({udi: 111, role: 'Manager', permission: {role: 'agent'}});
    });
    it('Check pushLogout', async() => {
        await store.dispatch('pushLogout');
        await expect(store.getters.getToken).toStrictEqual('');
    });
});

describe('createQueue', () => {
    const actions = createQueue.actions;
    const state = createQueue.state;
    const mutations = createQueue.mutations;
    const getters = createQueue.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(createQueue).toMatchSnapshot();
        // console.log({'actions effects' : store.getters.numbers});
        // console.log({'actions effects' : store._mutations.setNumbers});
        // console.log({'actions store': store._actions.getNumbers});
    });
    it('Check state property', () => {
        expect(createQueue).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(createQueue).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(createQueue).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(createQueue).toHaveProperty('getters');
    });
    it('Check setNameQueue', async() => {
        await store.dispatch('setNameQueue', 'Kirill');
        await expect(store.getters.newQueueName).toStrictEqual('Kirill');
    });
    it('Check setInternalNumberQueue', async() => {
        await store.dispatch('setInternalNumberQueue', '111');
        await expect(store.getters.newQueueInternalNumber).toStrictEqual('111');
    });
    it('Check setStrategyQueue', async() => {
        await store.dispatch('setStrategyQueue', 'ringAll');
        await expect(store.getters.newQueueStrategy).toStrictEqual('ringAll');
    });
    it('Check setTimeoutQueue', async() => {
        await store.dispatch('setTimeoutQueue', '10');
        await expect(store.getters.newQueueTimeout).toStrictEqual('10');
    });
    it('Check setRingQueue', async() => {
        await store.dispatch('setRingQueue', 'yes');
        await expect(store.getters.newQueueRing).toStrictEqual('yes');
    });
    it('Check setRelatedWithQueue', async() => {
        await store.dispatch('setRelatedWithQueue', {userUid: [1, 2]});
        await expect(store.getters.newQueueAgents).toStrictEqual([1, 2]);
    });
    it('Check setBelongToQueue', async() => {
        await store.dispatch('setBelongToQueue', [1, 2]);
        await expect(store.getters.newQueueManagers).toStrictEqual([1, 2]);
    });
    it('Check getStaffQueue agent', async() => {
        await store.dispatch('getStaffQueue', [{
            name: 'a',
            permission: {
                role: 'agent'
            }
        }]);
        await expect(store.getters.agentsQueue).toStrictEqual([{
            name: 'a',
            permission: {
                role: 'agent'
            }
        }]);
    });
    it('Check getStaffQueue manager', async() => {
        await store.dispatch('getStaffQueue', [{
            name: 'a',
            permission: {
                role: 'manager'
            }
        }]);
        await expect(store.getters.managersQueue).toStrictEqual([{
            name: 'a',
            permission: {
                role: 'manager'
            }
        }]);
    });
    it('Check resetCreateQueue', async() => {
        await store.dispatch('resetCreateQueue');
        await expect(store.getters.newQueue).toStrictEqual({
            name: '',
            internalNumber: '',
            strategy: '',
            timeout: '',
            ringinuse: '',
            relatedWith: {
                userUid: []
            },
            belongTo: []
        });
    });
});

describe('navigation', () => {
    const actions = navigation.actions;
    const state = navigation.state;
    const mutations = navigation.mutations;
    const getters = navigation.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(navigation).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(navigation).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(navigation).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(navigation).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(navigation).toHaveProperty('getters');
    });
    it('Check getPath', async() => {
        await store.dispatch('getPath', [1, 2]);
        await expect(store.getters.pathLocation).toStrictEqual([1, 2]);
    });
});


describe('numbers', () => {
    const actions = numbers.actions;
    const state = numbers.state;
    const mutations = numbers.mutations;
    const getters = numbers.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(numbers).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(numbers).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(numbers).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(numbers).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(numbers).toHaveProperty('getters');
    });
    it('Check addNumbers', async() => {
        store.commit('getDepartmentsForNumbers', [{
            uid: '111',
            relatedWith: {
                externalNumber: []
            }
        }]);
        await store.dispatch('addNumbers', {
            '111': ['066']
        });
        await store.dispatch('addNumbers', {
            '111': ['066']
        });
    });
    it('Check removeNumber', async() => {
        store.commit('getDepartmentsForNumbers', [{
            uid: '111',
            relatedWith: {
                externalNumber: []
            }
        }]);
        await store.dispatch('removeNumber', {
            '111': ['066']
        });
        await store.dispatch('removeNumber', {
            '111': ['066']
        });
    });
    it('Check getNumbersForView', async() => {
        store.commit('getNumbersForView', [{
            uid: '111',
            relatedWith: {
                externalNumber: []
            }
        }]);
        await expect(store.getters.numbersForView).toStrictEqual([{
            uid: '111',
            relatedWith: {
                externalNumber: []
            }
        }]);
    });
    it('Check clearDepForWrite', async() => {
        store.commit('clearDepForWrite');
        await expect(store.getters.uidForWrite).toStrictEqual([]);
    });
});

describe('billing', () => {
    const actions = billing.actions;
    const state = billing.state;
    const mutations = billing.mutations;
    const getters = billing.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(billing).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(billing).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(billing).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(billing).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(billing).toHaveProperty('getters');
    });
    it('Check setStatement', async() => {
        await store.dispatch('setStatement', mockBilling.statement);
        await expect(store.getters.getStatement).toStrictEqual(mockBilling.statement);
    });
    it('Check setLastPayments', async() => {
        await store.dispatch('setLastPayments', mockBilling.getLastPayments);
        await expect(store.getters.getLastPayments).toStrictEqual(mockBilling.getLastPayments);
    });
    it('Check setPayments', async() => {
        await store.dispatch('setPayments', mockBilling.getLastPayments);
        await expect(store.getters.getPayments).toStrictEqual(mockBilling.getLastPayments);
    });
    it('Check setLastCharges', async() => {
        await store.dispatch('setLastCharges', mockBilling.getLastCharges);
        await expect(store.getters.getLastCharges).toStrictEqual(mockBilling.getLastCharges);
    });
    it('Check setCharges', async() => {
        await store.dispatch('setCharges', mockBilling.getLastCharges);
        await expect(store.getters.getCharges).toStrictEqual(mockBilling.getLastCharges);
    });
});

describe('report', () => {
    const actions = report.actions;
    const state = report.state;
    const mutations = report.mutations;
    const getters = report.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(report).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(report).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(report).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(report).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(report).toHaveProperty('getters');
    });
    it('Check setCDR', async() => {
        await store.dispatch('setCDR', [1, 2]);
        await expect(store.getters.getCDR).toStrictEqual([1, 2]);
    });
    it('Check setPaginatorCDR', async() => {
        await store.dispatch('setPaginatorCDR', {'peer-page': 12, currentPage: 1, recordsPerPage: '12'});
        await expect(store.getters.getPaginatorCDR).toStrictEqual({'peer-page': 12, currentPage: 1, recordsPerPage: '12'});
    });
    it('Check setUsersCDR', async() => {
        await store.dispatch('setUsersCDR', [{internalNumber: 123}]);
        await expect(store.getters.getUsersCDR).toStrictEqual([{internalNumber: '123'}]);
    });
    it('Check setPageCDR', async() => {
        await store.dispatch('setPageCDR', 12);
        await expect(store.getters.getPageCDR).toStrictEqual(12);
    });
    it('Check setPeerPageCDR', async() => {
        await store.dispatch('setPeerPageCDR', 15);
        await expect(store.getters.getPeerPageCDR).toStrictEqual(15);
    });
    it('Check setCountry', async() => {
        await store.dispatch('setCountry', [{iso3: 'UKR'}]);
        await expect(store.getters.getCountry).toStrictEqual([{iso3: 'UKR'}]);
    });
});

describe('scenario', () => {
    const actions = scenario.actions;
    const state = scenario.state;
    const mutations = scenario.mutations;
    const getters = scenario.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(scenario).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(scenario).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(scenario).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(scenario).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(scenario).toHaveProperty('getters');
    });
    it('Check setInitialList', async() => {
        await store.dispatch('setInitialList', mockScenario.getListScenarios);
        await expect(store.getters.getInitialList).toStrictEqual(mockScenario.getListScenarios);
    });
    it('Check setListScenarios', async() => {
        await store.dispatch('setListScenarios', mockScenario.getListScenarios);
        await expect(store.getters.getListScenarios).toStrictEqual(mockScenario.getListScenarios);
    });
    it('Check setScenario', async() => {
        await store.dispatch('setScenario', mockScenario.getScenario);
        await expect(store.getters.getScenario).toStrictEqual(mockScenario.getScenario);
    });
    it('Check setCountriesScenario', async() => {
        await store.dispatch('setCountriesScenario', mockScenario.getCountriesScenario);
        await expect(store.getters.getCountriesScenario).toStrictEqual(mockScenario.getCountriesScenario);
    });
    it('Check setExternalNumbers', async() => {
        await store.dispatch('setExternalNumbers', mockScenario.getExternalNumbers);
        await expect(store.getters.getExternalNumbers).toStrictEqual(mockScenario.getExternalNumbers);
    });
    it('Check addItemScen', async() => {
        await store.dispatch('setScenario', {scenario: {schema: 'vnumber-in'}});
        await store.dispatch('addItemScen', mockScenario.getItemScenarioQueue);
        await expect(store.getters.getScenario).toStrictEqual({
            scenario: {
                next: {
                    category: "app-queue-1569-d0710047-b169-495e-bf41-c9a1bf86a0f6",
                    next: {},
                    option: {name: "Queue", number: "1569", maxWait: 3600, moh: false},
                    schema: "queue"
                },
                schema: "vnumber-in"
            }
        });
    });
    it('Check setShowConfig', async() => {
        await store.dispatch('setShowConfig', 'dial');
        await expect(store.getters.getShowConfig).toStrictEqual('dial');
    });
    it('Check setQueuesScenarios', async() => {
        await store.dispatch('setQueuesScenarios', mockScenario.getItemScenarioQueue);
        await expect(store.getters.getQueuesScenarios).toStrictEqual(mockScenario.getItemScenarioQueue);
    });
    it('Check setUserScenario', async() => {
        await store.dispatch('setUserScenario', mockScenario.getUserScenario);
        await expect(store.getters.getUserScenario).toStrictEqual(mockScenario.getUserScenario);
    });
    it('Check changeItemScenarios', async() => {
        await store.dispatch('setScenario', {scenario: {category: 'from-provider'}, externalNumber: []});
        await store.dispatch('changeItemScenarios', mockScenario.getItemScenario);
        await expect(store.getters.getScenario).toStrictEqual({
            scenario: {
                category: "from-provider",
                option: {name: null, externalNumber: ['380443640000']},
                schema: "vnumber-in"
            },
            externalNumber: ['380443640000']
        });
    });
    it('Check setItemScenario', async() => {
        await store.dispatch('setItemScenario', mockScenario.getItemScenarioDial);
        await expect(store.getters.getItemScenario).toStrictEqual(mockScenario.getItemScenarioDial);
    });
    it('Check setNewScenario', async() => {
        await store.dispatch('setNewScenario', mockScenario.getScenario);
        await expect(store.getters.getScenario).toStrictEqual(mockScenario.getScenario);
    });
});

describe('global', () => {
    const actions = global.actions;
    const state = global.state;
    const mutations = global.mutations;
    const getters = global.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(global).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(global).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(global).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(global).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(global).toHaveProperty('getters');
    });
    it('Check setGlobalSearch', async() => {
        await store.dispatch('setGlobalSearch', '123');
        await expect(store.getters.getGlobalSearch).toStrictEqual('123');
    });
    it('Check setSearchWithoutObservables', async() => {
        await store.dispatch('setSearchWithoutObservables', '123');
        await expect(store.getters.getGlobalSearch).toStrictEqual('123');
    });
    it('Check setActiveLinkSupport', async() => {
        await store.dispatch('setActiveLinkSupport', '123');
        await expect(store.getters.getActiveLinkSupport).toStrictEqual('123');
    });
});

describe('firewall', () => {
    const array = [
        {
            id: 123,
            ip: '192.168.0.1',
            chain: 'web',
            description: 'test'
        }
    ];

    const dataInList = [
        {
            id: [123],
            ip: '192.168.0.1',
            chain: ['web'],
            description: 'test'
        }
    ];

    const newIP = {
        id: 125,
        ip: '192.168.0.1',
        chain: 'voip',
        description: 'test'
    };

    const actions = firewall.actions;
    const state = firewall.state;
    const mutations = firewall.mutations;
    const getters = firewall.getters;
    const store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
      });
    it('Check snapshot', () => {
        expect(firewall).toMatchSnapshot();
    });
    it('Check state property', () => {
        expect(firewall).toHaveProperty('state');
    });
    it('Check actions property', () => {
        expect(firewall).toHaveProperty('actions');
    });
    it('Check effects property', () => {
        expect(firewall).toHaveProperty('mutations');
    });
    it('Check getters property', () => {
        expect(firewall).toHaveProperty('getters');
    });
    it('Check setListFirewall', async() => {
        await store.dispatch('setListFirewall', array);
        await expect(store.getters.getListFirewall).toStrictEqual(dataInList);
    });
    it('Check setInitialListFirewall', async() => {
        await store.dispatch('setInitialListFirewall', array);
        await expect(store.getters.getInitialListFirewall).toStrictEqual(dataInList);
    });
    it('Check setAddNewFirewallIP', async() => {
        await store.dispatch('setListFirewall', array);
        await store.dispatch('setAddNewFirewallIP', newIP);
        await expect(store.getters.getListFirewall).toStrictEqual([
            {
                id: [123, 125],
                ip: '192.168.0.1',
                chain: ['web', 'voip'],
                description: 'test'
            }
        ]);
    });
    it('Check setAddNewFirewallIP', async() => {
        await store.dispatch('setListFirewall', []);
        await store.dispatch('setAddNewFirewallIP', newIP);
        await expect(store.getters.getListFirewall).toStrictEqual([
            {
                id: [125],
                ip: '192.168.0.1',
                chain: ['voip'],
                description: 'test'
            }
        ]);
    });
    it('Check setDeleteFirewallIP', async() => {
        await store.dispatch('setListFirewall', [
            {
                id: 125,
                ip: '192.168.0.1',
                chain: 'voip',
                description: 'test'
            }
        ]);
        await store.dispatch('setInitialListFirewall', [
            {
                id: 125,
                ip: '192.168.0.1',
                chain: 'voip',
                description: 'test'
            }
        ]);
        await store.dispatch('setDeleteFirewallIP', {
            id: [125],
            ip: '192.168.0.1',
            chain: ['voip'],
            description: 'test'
        });
        await expect(store.getters.getListFirewall).toStrictEqual([]);
        await expect(store.getters.getInitialListFirewall).toStrictEqual([]);
    });
    it('Check setUpdateFirewallIP', async() => {
        await store.dispatch('setListFirewall', [
            {
                id: 125,
                ip: '192.168.0.1',
                chain: 'voip',
                description: 'test'
            }
        ])
        .then(async () => {
            await store.dispatch('setUpdateFirewallIP', {
                id: 125,
                ip: '192.168.0.1',
                chain: 'web',
                description: 'test1'
            })
            .then(async () => {
                await expect(store.getters.getListFirewall).toStrictEqual([
                    {
                        id: [125],
                        ip: '192.168.0.1',
                        chain: ['voip'],
                        description: 'test'
                    }
                ]);
            });
        });
    });
});

