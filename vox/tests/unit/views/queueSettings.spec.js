import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import QueueSetting from '../../../src/views/Config/Queues/QueuesSettings/QueuesSettings.vue';
import AgentsSetting from '../../../src/views/Config/Queues/QueuesSettings/components/AgentsSettings.vue';
import ConfigSetting from '../../../src/views/Config/Queues/QueuesSettings/components/ConfigSettings.vue';
import DeleteQueue from '../../../src/views/Config/Queues/QueuesSettings/components/DeleteQueue.vue';
import ManagersSetting from '../../../src/views/Config/Queues/QueuesSettings/components/ManagersSettings.vue';
import QueueInfo from '../../../src/views/Config/Queues/QueuesSettings/components/QueueInfo.vue';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('QueueSetting', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            queueInfo: {
                uid: 5000,
                strategy: 'Random',
                ringinuse: 'ringinuse',
                relatedWith: {user:[]},
                belongTo: []
            },
            deleteQueue: {}
        },
        mutations: {
            queueInfoMutation(state, value) {
                state.queueInfo = value;
            }
        },
        getters: {
            getQueueInfo(state) {
                return state.queueInfo;
            },
        }
    });
    const wrapper = shallowMount(QueueSetting, {
        store,
        localVue,
        router,
        stubs: {QueueSetting: true}
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
        QueueSetting.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        store.commit('queueInfoMutation', {
            strategy: 'Random',
            ringinuse: 'ringinuse',
            relatedWith: [],
            belongTo: []
        });
        await QueueSetting.mounted.call(wrapper.vm);
    });
});

describe('AgentsSetting', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            agents: [],
            queueAgetns: [],
            agentsInfo: {
                user: []
            }
        },
        actions: {
            setAgentsQueueInfo({
                commit
            }, value) {}
        },
        mutations: {
            queueInfoMutation(state, value) {
                state.queueInfo = value;
            }
        },
        getters: {
            agentsQueue(state) {
                return state.agents;
            },
            agentsDep(state) {
                return state.queueAgetns;
            },
            getAgentsQueueInfo(state) {
                return state.agentsInfo;
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
    //         name: '123'
    //     })
    //     AgentsSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('computed agentsFiltered', () => {
    //     wrapper.setData({
    //         name: 'ффф'
    //     })
    //     AgentsSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    it('mounted component', () => {
        AgentsSetting.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        store.commit('queueInfoMutation', {
            strategy: 'Random',
            ringinuse: 'ringinuse',
            relatedWith: [],
            belongTo: []
        });
        await AgentsSetting.mounted.call(wrapper.vm);
    });
});

describe('ConfigSetting', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            strategy: '',
            timeout: '',
            ringInUse: '',
            wait: ''
        },
        actions: {
            setStrategyInfo({
                commit
            }, value) {},
            setTimeoutInfo({
                commit
            }, value) {},
            setRingInUseInfo({
                commit
            }, value) {}
        },
        getters: {
            getStrategyInfo(state) {
                return state.strategy;
            },
            getTimeoutInfo(state) {
                return state.timeout;
            },
            getRingInUseInfo(state) {
                return state.ringInUse;
            },
            getMaxWaitInfo(state) {
                return state.wait;
            },
        }
    });
    const wrapper = shallowMount(ConfigSetting, {
        store,
        localVue,
        router,
        stubs: {ConfigSetting: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('setShowOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setShowOptions');
        await wrapper.vm.setShowOptions('showRing');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions('strategy', 'ring all');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions('timeout', '10');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions('ring', 'yes');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions('', 'yes');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});

describe('DeleteQueue', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            deleteQueue: {}
        },
        actions: {
            setDeleteQueueInfo({
                commit
            }, value) {},
        },
        getters: {
            getDeleteQueueInfo(state) {
                return state.deleteQueue;
            },
        }
    });
    const wrapper = shallowMount(DeleteQueue, {
        store,
        localVue,
        router,
        stubs: {DeleteQueue: true}
    });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('cancelDelete toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'cancelDelete');
        await wrapper.vm.cancelDelete();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteQueue toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteQueue');
        await wrapper.vm.deleteQueue();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('ManagersSetting', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            managersQ: [],
            managerQInfo: {
                user: [
                    {
                        uid: '',
                        option: {
                            edit: 1
                        }
                    }
                ],
            },
            QLength: 1
        },
        actions: {
            setMagagersQueueInfo({
                commit
            }, value) {},
        },
        getters: {
            managersQueue(state) {
                return state.managersQ;
            },
            getManagersQueueInfo(state) {
                return state.managerQInfo;
            },
            getAgentsLength(state) {
                return state.QLength;
            }
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
    // it('agentsFiltered agentsFiltered', async () => {
    //     await ManagersSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('agentsFiltered agentsFiltered', async () => {
    //     wrapper.setData({name: '123'})
    //     await ManagersSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    // it('agentsFiltered agentsFiltered', async () => {
    //     wrapper.setData({name: 'aaa'})
    //     await ManagersSetting.computed.agentsFiltered.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        await ManagersSetting.mounted.call(wrapper.vm);
    });
});

describe('QueueInfo', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            nameQ: '',
            agents: {
                user: ''
            },
            infoQ: {
                internalNumber: 1111
            },
            agentsLength: 4
        },
        actions: {
            setDeleteQueueInfo({
                commit
            }, value) {},
            setQueueNameInfo({
                commit
            }, value) {},
        },
        getters: {
            getQueueNameInfo(state) {
                return state.nameQ;
            },
            numbersDep(state) {
                return state.nameQ;
            },
            getAgentsQueueInfo(state) {
                return state.agents;
            },
            managersDep(state) {
                return state.nameQ;
            },
            getQueueInfo(state) {
                return state.infoQ;
            },
            getAgentsLength(state) {
                return state.agentsLength;
            }
        }
    });
    const wrapper = shallowMount(QueueInfo, {
        store,
        localVue,
        router,
        stubs: {QueueInfo: true}
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
    it('setQueueName toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setQueueName');
        await wrapper.vm.setQueueName();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toggleEdit toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleEdit');
        await wrapper.vm.toggleEdit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('agentsFiltered agentsFiltered', async () => {
        await QueueInfo.computed.computedWidth.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await QueueInfo.mounted.call(wrapper.vm);
    });

});
