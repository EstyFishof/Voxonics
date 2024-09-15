import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Queue from '../../../src/views/Config/Queues/CreateQueue/CreateQueue.vue';
import AddAgent from '../../../src/views/Config/Queues/CreateQueue/components/AddAgent.vue';
import AddManagers from '../../../src/views/Config/Queues/CreateQueue/components/AddManagers.vue';
import QueueInfo from '../../../src/views/Config/Queues/CreateQueue/components/QueueInfo.vue';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('CreateQueue', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

const store = new Vuex.Store({
    state: {
        queue: {uid: 5000, strategy: 'Random', option: {edit: false}, ringinuse: 'ringinuse', relatedWith: [], belongTo: []}
    },
    // effects: {
    //     setAgents(state, value) {
    //         state.queue = value
    //     }
    // },
    getters: {
        newQueue(state) {
            return state.queue;
        }
    }
});
    const wrapper = shallowMount(Queue, { store, localVue, stubs: {Queue: true} });

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
        Queue.mounted.call(wrapper.vm);
    });
});

describe('AddAgent', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            agentsQueue: [],
            agents: []
        },
        actions: {
            setRelatedWithQueue({commit}, value) {},
        },
        mutations: {
            setQueueAgents(state, value) {
                state.agentsQueue = value;
            }
        },
        getters: {
            newQueueAgents(state) {
                return state.agentsQueue;
            },
            agentsQueue(state) {
                return state.agents;
            }
        }
    });
    const wrapper = shallowMount(AddAgent, { store, localVue, stubs: {AddAgent: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('sort typeof', () => {
        expect(typeof wrapper.vm.name).toBe('string');
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
        await store.commit('setQueueAgents', [{}, {}]);
        await AddAgent.mounted.call(wrapper.vm);
    });
});

describe('AddManagers', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            managersQueue: [{option: {edit: true}}],
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
            newQueueManagers: [
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
            setBelongToQueue({commit}, value) {},
        },
        mutations: {
            setQueueManagers(state, value) {
                state.managersQueue = value;
            }
        },
        getters: {
            newQueueManagers(state) {
                return state.managersQueue;
            },
            managersQueue(state) {
                return state.managers;
            },
            userInfo(state) {
                return state.userInfo;
            }
        }
    });
    const wrapper = shallowMount(AddManagers, { store, localVue, stubs: {AddManagers: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('sort typeof', () => {
        expect(typeof wrapper.vm.name).toBe('string');
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
    it('changeEdit toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeEdit');
        await wrapper.vm.changeEdit();
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
        await wrapper.setData({relatedManagers: [{option: {edit: true}}]});
        await store.commit('setQueueManagers', [{}, {}]);
        await AddManagers.mounted.call(wrapper.vm);
    });
});

describe('QueueInfo', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            queue: {},
            queueName: 'name',
            queueNumber: 1111,
            strategy: 'Ring all',
            timeout: 10,
            ring: 'yes'
        },
        actions: {
            setNameQueue({commit}, value) {},
            setInternalNumberQueue({commit}, value) {},
            setStrategyQueue({commit}, value) {},
            setTimeoutQueue({commit}, value) {},
            setRingQueue({commit}, value) {},
        },
        mutations: {
            nameMutations(state, value) {
                state.queueName = value;
            },
            numberMutations(state, value) {
                state.queueNumber = value;
            },
            strategyMutations(state, value) {
                state.strategy = value;
            },
            timeoitMutations(state, value) {
                state.timeout = value;
            },
            ringMutations(state, value) {
                state.ring = value;
            },
        },
        getters: {
            newQueue(state) {
                return state.queue;
            },
            newQueueName(state) {
                return state.queueName;
            },
            newQueueInternalNumber(state) {
                return state.queueNumber;
            },
            newQueueStrategy(state) {
                return state.strategy;
            },
            newQueueTimeout(state) {
                return state.timeout;
            },
            newQueueRing(state) {
                return state.ring;
            },
        }
    });
    const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('setQueueName toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setQueueName');
        await wrapper.vm.setQueueName();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setQueueNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setQueueNumber');
        await wrapper.vm.setQueueNumber();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setShowOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setShowOptions');
        await wrapper.vm.setShowOptions('strategy');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions('strategy', 'ring All');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions('timeout', 10);
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
    it('mounted component', async () => {
        const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}} });
        await store.commit('nameMutations', '');
        await QueueInfo.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}}});
        await store.commit('numberMutations', '');
        await QueueInfo.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}} });
        await store.commit('strategyMutations', '');
        await QueueInfo.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}} });
        await store.commit('timeoitMutations', '');
        await QueueInfo.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}} });
        await store.commit('ringMutations', '');
        await QueueInfo.mounted.call(wrapper.vm);
    });
    it('mounted component', async () => {
        const wrapper = shallowMount(QueueInfo, { store, localVue, router, stubs: {QueueInfo: true}, propsData: {requiredFields: {name: true, internalNumber: false}} });
        await QueueInfo.mounted.call(wrapper.vm);
    });
});


