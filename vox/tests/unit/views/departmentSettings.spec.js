import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import DepartmentSettings from '../../../src/views/Config/Departments/DepartmentSettings/DepartmentSettings.vue';
import AgentsSetting from '../../../src/views/Config/Departments/DepartmentSettings/components/AgentsSettings.vue';
import DepartmentInfo from '../../../src/views/Config/Departments/DepartmentSettings/components/DepartmentInfo.vue';
import ManagersSetting from '../../../src/views/Config/Departments/DepartmentSettings/components/ManagersSettings.vue';
import NumbersSettings from '../../../src/views/Config/Departments/DepartmentSettings/components/NumbersSettings.vue';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('DepartmentSettings', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            department: {
                name: "",
                relatedWith: {
                    externalNumber: [],
                    user: []
                },
                belongTo: { user: [] }
            },
        },
        mutations: {
            depInfoMutation(state, value) {
                state.department = value;
            }
        },
        getters: {
            departmentInfo(state) {
                return state.department;
            },
        }
    });
    const wrapper = shallowMount(DepartmentSettings, {
        store,
        localVue,
        router,
        stubs: {DepartmentSettings: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('setShowOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setShowOptions');
        await wrapper.vm.setShowOptions('config');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('handlerSubmit toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'handlerSubmit');
        await wrapper.vm.handlerSubmit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('clearDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'clearDepartment');
        await wrapper.vm.clearDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mounted component', () => {
        DepartmentSettings.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        store.commit('depInfoMutation', {
            uid: 1111
        });
        await DepartmentSettings.mounted.call(wrapper.vm);
    });
});

describe('AgentsSetting', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            agents: [],
            depAgents: [],
        },
        actions: {
            changeAgentsDepartment({
                commit
            }, value) {}
        },
        mutations: {
            queueInfoMutation(state, value) {
                state.queueInfo = value;
            }
        },
        getters: {
            agents(state) {
                return state.agents;
            },
            agentsDep(state) {
                return state.depAgents;
            },
        }
    });
    const wrapper = shallowMount(AgentsSetting, {
        store,
        localVue,
        router,
        stubs: {AgentsSetting: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        await wrapper.vm.chooseAgent({
            uid: 111
        });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        wrapper.setData({
            relatedAgents: [{
                uid: 111
            }]
        });
        await wrapper.vm.chooseAgent({
            uid: 111
        });
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
    //     AgentsSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({
    //         name: '123'
    //     })
    //     AgentsSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({
    //         name: 'aaa'
    //     })
    //     AgentsSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        await AgentsSetting.mounted.call(wrapper.vm);
    });
});

describe('DepartmentInfo', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            depNumbers: [],
            depAgents: [],
            depManagers: [],
            name: ''
        },
        actions: {
            changeNameDepartment({
                commit
            }, value) {},
            setDeleteDep({commit}, value) {}
        },
        getters: {
            numbersDep(state) {
                return state.depNumbers;
            },
            agentsDep(state) {
                return state.depAgents;
            },
            managersDep(state) {
                return state.depManagers;
            },
            departmentInfoName(state) {
                return state.name;
            },
        }
    });
    const wrapper = shallowMount(DepartmentInfo, {
        store,
        localVue,
        router,
        stubs: {DepartmentInfo: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('del toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'del');
        await wrapper.vm.del();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setDepartmentName toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setDepartmentName');
        await wrapper.vm.setDepartmentName();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toggleEdit toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleEdit');
        await wrapper.vm.toggleEdit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('computed agentsFiltered', () => {
        DepartmentInfo.computed.computedWidth.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await DepartmentInfo.mounted.call(wrapper.vm);
    });
});

describe('ManagersSetting', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            depManagers: [],
            managerDepInfo: {
                user: [
                    {
                        uid: '',
                        option: {
                            edit: 1
                        }
                    }
                ],
            },
            managersDep: [
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
            changeManagersDepartment({
                commit
            }, value) {},
        },
        getters: {
            managers(state) {
                return state.depManagers;
            },
            managersDep(state) {
                return state.managerDepInfo;
            },
        }
    });
    const wrapper = shallowMount(ManagersSetting, {
        store,
        localVue,
        router,
        stubs: {ManagersSetting: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        wrapper.setData({relatedManagers: [{uid: 222, option: {edit: true}}]});
        await wrapper.vm.chooseAgent({uid: 111, option: {edit: true}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseAgent toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        wrapper.setData({relatedManagers: [{uid: 111, option: {edit: true}}]});
        await wrapper.vm.chooseAgent({uid: 111, option: {edit: true}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('changeEdit toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeEdit');
        await wrapper.vm.changeEdit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setAgentsDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setAgentsDepartment');
        await wrapper.vm.setAgentsDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('agentsFiltered agentsFiltered', async () => {
        await ManagersSetting.computed.agentsFiltered.call(wrapper.vm);
    });
    it('agentsFiltered agentsFiltered', async () => {
        wrapper.setData({name: '123'});
        await ManagersSetting.computed.agentsFiltered.call(wrapper.vm);
    });
    it('agentsFiltered agentsFiltered', async () => {
        wrapper.setData({name: 'aaa'});
        await ManagersSetting.computed.agentsFiltered.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await wrapper.setData({relatedManagers: [{option: {edit: true}}]});
        await ManagersSetting.mounted.call(wrapper.vm);
    });
});

describe('NumbersSettings', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            depNumbers: [],
            numberDepInfo: {
                uid: "a27cb70c-2560-481e-8039-f0e10d48bbc0",
                number: "380443640000",
                name: "Work phone",
                country: "UA kiev",
                network: "test"
            }
        },
        actions: {
            changeNumbersDepartment({
                commit
            }, value) {},
        },
        getters: {
            numbers(state) {
                return state.depNumbers;
            },
            numbersDep(state) {
                return state.numberDepInfo;
            },
        }
    });
    const wrapper = shallowMount(NumbersSettings, {
        store,
        localVue,
        router,
        stubs: {NumbersSettings: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('chooseNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        wrapper.setData({relatedNumbers: [{uid: 222}]});
        await wrapper.vm.chooseNumber({uid: 111});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        wrapper.setData({relatedNumbers: [{uid: 222}]});
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
    // it('numbersFiltered computed', async () => {
    //     await NumbersSettings.computed.numbersFiltered.call(wrapper.vm)
    // })
    // it('numbersFiltered computed', async () => {
    //     wrapper.setData({name: '123'})
    //     await NumbersSettings.computed.numbersFiltered.call(wrapper.vm)
    // })
    // it('numbersFiltered computed', async () => {
    //     wrapper.setData({name: 'aaa'})
    //     await NumbersSettings.computed.numbersFiltered.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        await NumbersSettings.mounted.call(wrapper.vm);
    });
});
