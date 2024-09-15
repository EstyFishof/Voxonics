import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Department from '../../../src/views/Config/Departments/CreateDepartment/CreateDepartment.vue';
import AddAgent from '../../../src/views/Config/Departments/CreateDepartment/components/AddAgent.vue';
import AddManagers from '../../../src/views/Config/Departments/CreateDepartment/components/AddManagers.vue';
import DepartmentInfo from '../../../src/views/Config/Departments/CreateDepartment/components/DepartmentInfo.vue';
import AddNumbers from '../../../src/views/Config/Departments/CreateDepartment/components/AddNumbers.vue';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('CreateDepartment', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

const store = new Vuex.Store({
    state: {
        dep: {relatedWith: {externalNumberUid: [], userUid: []}, belongTo: []},
        userInfo: {
            option: {
                edit: false, 
                internalNumber: 136,
            },
            permission: {
                role: 'maganer'
            },
            internalNumber: 124
        }
    },
    // effects: {
    //     setAgents(state, value) {
    //         state.queue = value
    //     }
    // },
    getters: {
        newDepartment(state) {
            return state.dep;
        },
        userInfo(state) {
            return state.userInfo;
        }
    }
});
    const wrapper = shallowMount(Department, { store, localVue, router, stubs: {Department: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('handlerSubmit toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'handlerSubmit');
        await wrapper.vm.handlerSubmit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mounted component', () => {
        Department.mounted.call(wrapper.vm);
    });
});

describe('AddAgent', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            agentsDep: [{}, {}],
            agents: [],
            userInfo: {
                option: {
                    edit: false, 
                    internalNumber: 136,
                },
                permission: {
                    role: 'maganer'
                },
                internalNumber: 124
            }
        },
        actions: {
            transferAgentsDepartment({commit}, value) {},
        },
        mutations: {
            setDepAgents(state, value) {
                state.agentsDep = value;
            }
        },
        getters: {
            newDepartmentAgents(state) {
                return state.agentsDep;
            },
            agents(state) {
                return state.agents;
            },
            userInfo(state) {
                return state.userInfo;
            }
        }
    });
    const wrapper = shallowMount(AddAgent, { store, localVue, router, stubs: {AddAgent: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        await wrapper.vm.chooseAgent({});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        await wrapper.setData({relatedAgents: [{uid: 111}]});
        await wrapper.vm.chooseAgent({uid: 111});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setAgentsDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setAgentsDepartment');
        await wrapper.vm.setAgentsDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('computed agentsFiltered', () => {
    //     AddAgent.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({name: 'aaa'})
    //     AddAgent.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({name: '123'})
    //     AddAgent.computed.agentsFiltered.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        const wrapper = shallowMount(AddAgent, { store, localVue, router });
        await AddAgent.mounted.call(wrapper.vm);
    });
});

describe('AddManagers', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            managersDep: [{option: {edit: true}}],
            managers: [],
            userInfo: {
                option: {
                    edit: false, 
                    internalNumber: 136,
                },
                permission: {
                    role: 'maganer'
                },
                internalNumber: 124
            },
            newDepartmentManagers: [
                {
                    avatar: '',
                    name: '',
                    internalNumber: '',
                    option: {
                        edit: false
                    }
                }
            ]
        },
        actions: {
            transferManagersDepartment({commit}, value) {},
        },
        mutations: {
            setQueueManagers(state, value) {
                state.managersDep = value;
            }
        },
        getters: {
            newDepartmentManagers(state) {
                return state.managersDep;
            },
            managers(state) {
                return state.managers;
            },
            userInfo(state) {
                return state.userInfo;
            }
        }
    });
    const wrapper = shallowMount(AddManagers, { store, localVue, router, stubs: {AddManagers: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        await store.commit('setQueueManagers', []);
        await wrapper.vm.chooseAgent({});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        await wrapper.setData({relatedManagers: [{uid: 111}]});
        await wrapper.vm.chooseAgent({uid: 111});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setAgentsDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setAgentsDepartment');
        await wrapper.vm.setAgentsDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({name: 'aaa'})
    //     AddManagers.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({name: '123'})
    //     AddManagers.computed.agentsFiltered.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        const wrapper = shallowMount(AddManagers, { store, localVue, router });
        await AddManagers.mounted.call(wrapper.vm);
    });
});

describe('DepartmentInfo', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            // dep: {relatedWith: {externalNumberUid: [], userUid: []}, belongTo: []}
            name: 'dep',
            userInfo: {
                option: {
                    edit: false, 
                    internalNumber: 136,
                },
                permission: {
                    role: 'maganer'
                },
                internalNumber: 124
            }
        },
        actions: {
            transferNameDepartment({commit}, value) {},
        },
        mutations: {
            nameMutations(state, value) {
                state.queueName = value;
            },
        },
        getters: {
            newDepartmentName(state) {
                return state.name;
            },
            userInfo(state) {
                return state.userInfo;
            }
        }
    });
    const wrapper = shallowMount(DepartmentInfo, { store, localVue, router, stubs: {DepartmentInfo: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('setDepartmentName toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setDepartmentName');
        await wrapper.vm.setDepartmentName();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mounted component', async () => {
        const wrapper = shallowMount(DepartmentInfo, { store, localVue, router });
        await DepartmentInfo.mounted.call(wrapper.vm);
    });
});

describe('AddNumbers', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            numbers: [],
            depNumbers: [],
            userInfo: {
                option: {
                    edit: false, 
                    internalNumber: 136,
                },
                permission: {
                    role: 'maganer'
                },
                internalNumber: 124
            }
        },
        actions: {
            transferNumberDepartment({commit}, value) {},
        },
        mutations: {
            depNumbersMutations(state, value) {
                state.depNumbers = value;
            },
        },
        getters: {
            numbers(state) {
                return state.numbers;
            },
            newDepartmentNumbers(state) {
                return state.depNumbers;
            },
            userInfo(state) {
                return state.userInfo;
            }
        }
    });
    const wrapper = shallowMount(AddNumbers, { store, localVue, router, stubs: {AddNumbers: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('chooseNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        await wrapper.setData({relatedNumbers: [{uid: 222}]});
        await wrapper.vm.chooseNumber({uid: 111});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        await wrapper.setData({relatedNumbers: [{uid: 111}]});
        await wrapper.vm.chooseNumber({uid: 111});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setNumbersDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setNumbersDepartment');
        await wrapper.vm.setNumbersDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('computed agentsFiltered', async () => {
    //     await AddNumbers.computed.numbersFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', async () => {
    //     wrapper.setData({name: 'aaa'})
    //     await AddNumbers.computed.numbersFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', async () => {
    //     wrapper.setData({name: '123'})
    //     await AddNumbers.computed.numbersFiltered.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        await AddNumbers.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        store.commit('depNumbersMutations', [{}, {}]);
        await AddNumbers.mounted.call(wrapper.vm);
    });
});


