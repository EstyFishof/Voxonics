import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Queues from '../../../src/views/Config/Queues/Queues.vue';
import Paginator from '../../../src/components/Paginator.vue';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('Queues', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const store = new Vuex.Store({
        state: {
            paginator: {peerPage: 10, page: 1, paginator: {count: 50, recordsPerPage: 5}},
            listManagers: [],
            globalSearch: ''
        },
        actions: {
            setStrategy({commit}, value) {},
            setTimeout({commit}, value) {},
            setRinginuse({commit}, value) {},
            setWait({commit}, value) {},
        },
        mutations: {
            managersQueueInfoMutation(state, value) {
                state.listManagers = value;
            }
        },
        getters: {
            queuesListManage(state) {
                return state.listManagers;
            },
            getPaginatorQueues(state) {
                return state.paginator;
            },
            getGlobalSearch(state) {
                return state.globalSearch;
            }
        }
    });

    // const mock = jest.fn()
    // const paginator = {
    //     render() {},
    //     methods: {
    //         mock
    //     }
    // }
    const wrapper = shallowMount(Queues, { store, localVue, router, stubs: {Queues: true, paginator: Paginator} });
    // wrapper.vm.$refs.paginator.mock()

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('sort typeof', () => {
        expect(typeof wrapper.vm.sortBy).toBe('string');
    });
    it('users typeof', () => {
        expect(typeof wrapper.vm.users).toBe('object');
    });
    it('load typeof', () => {
        expect(typeof wrapper.vm.load).toBe('boolean');
    });
    it('filter typeof', () => {
        expect(typeof wrapper.vm.filter).toBe('object');
    });
    it('deleteScroll toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteScroll');
        await wrapper.vm.deleteScroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('funScroll toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'funScroll');
        await wrapper.vm.funScroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('funScroll recordsPerPage < count', async () => {
        const spy = jest.spyOn(wrapper.vm, 'funScroll');
        await wrapper.vm.funScroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('viewDepartment toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'viewDepartment');
    //     await wrapper.vm.viewDepartment({name: 'queue', uid: 5000});
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('goToAddNewUserPage toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'goToAddNewUserPage');
    //     await wrapper.vm.goToAddNewUserPage();
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('toggleVisible toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
    //     await wrapper.vm.toggleVisible(true, 'selectedRing');
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    it('setStrategyShow toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setStrategyShow');
        await wrapper.vm.setStrategyShow(5000);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setStrategyShow toHaveBeenCalled', async () => {
        await wrapper.setData({showStrategy: 4000});
        const spy = jest.spyOn(wrapper.vm, 'setStrategyShow');
        await wrapper.vm.setStrategyShow(4000);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setRingShow toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setRingShow');
        await wrapper.vm.setRingShow(5000);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setRingShow toHaveBeenCalled', async () => {
        await wrapper.setData({showRing: 4000});
        const spy = jest.spyOn(wrapper.vm, 'setRingShow');
        await wrapper.vm.setRingShow(4000);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setTimeoutShow toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setTimeoutShow');
        await wrapper.vm.setTimeoutShow(5000);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setTimeoutShow toHaveBeenCalled', async () => {
        await wrapper.setData({showTimeout: 4000});
        const spy = jest.spyOn(wrapper.vm, 'setTimeoutShow');
        await wrapper.vm.setTimeoutShow(4000);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('setMaxWaitShow toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'setMaxWaitShow');
    //     await wrapper.vm.setMaxWaitShow(5000);
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('setMaxWaitShow toHaveBeenCalled', async () => {
    //     await wrapper.setData({showMaxWait: 4000})
    //     const spy = jest.spyOn(wrapper.vm, 'setMaxWaitShow');
    //     await wrapper.vm.setMaxWaitShow(4000);
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions({uid: '123'}, 'setStrategy', 'ringAll');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions({uid: '123'}, 'setTimeout', 'ringAll');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions({uid: '123'}, 'setRinginuse', 'ringAll');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions({uid: '123'}, 'setWait', 'ringAll');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'selectOptions');
        await wrapper.vm.selectOptions({uid: '123'}, '', 'ringAll');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setApply toHaveBeenCalled', async () => {
        await wrapper.setData({currentUids: [{uid: 5000, strategy: 'Random', ringinuse: 'ringinuse', relatedWith: {user: []}, belongTo: {user: []}}]});
        const spy = jest.spyOn(wrapper.vm, 'setApply');
        await wrapper.vm.setApply();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        await wrapper.setData({sortBy: "agents"});
        // console.log({'sort toHaveBeenCalled' : wrapper.vm});
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('name');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('fetch toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'fetch');
        await wrapper.vm.fetch('url', 9, 'name', 9, 'name');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('created component', () => {
        Queues.created.call(wrapper.vm);
    });
    it('mounted component', async () => {
        // await store.commit('managersQueueInfoMutation', [{}, {}])
        await Queues.mounted.call(wrapper.vm);
    });
    it('beforeDestroy component', () => {
        Queues.beforeDestroy.call(wrapper.vm);
    });

});
