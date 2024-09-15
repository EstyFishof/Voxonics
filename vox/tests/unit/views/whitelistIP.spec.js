import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import WhiteListIP from '@/views/Config/WhiteListIP/WhiteListIP.vue';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

describe('WhiteListIP', () => {
    // let getters, actions, store;
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            paginator: {
                paginator: {
                    recordsPerPage: 123
                }
            },
            theme: 'dark',
            list: [
                {
                    id: [123],
                    ip: '192.168.0.1',
                    chain: ['web'],
                    description: 'test'
                }
            ],
            initialList: [
                {
                    id: [123],
                    ip: '192.168.0.1',
                    chain: ['web'],
                    description: 'test'
                }
            ]
        },
        actions: {
            setSortListFirewall({commit}, value) {},
        },
        getters: {
            getPaginatorWhitelistIP(state) {
                return state.paginator;
            },
            theme(state) {
                return state.theme;
            },
            getListFirewall(state) {
                return state.list;
            },
            getInitialListFirewall(state) {
                return state.initialList;
            }
        }
    });

    const wrapper = shallowMount(WhiteListIP, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('verification toHaveBeenCalled', async () => {
        await wrapper.setData({newIP: {ip: '192.168.0.1', chain: 'web', description: 'test'}});
        const spy = jest.spyOn(wrapper.vm, 'verification');
        await wrapper.vm.verification();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.isValidIP).toStrictEqual(false);
        spy.mockRestore();
    });
    it('setNewIpParam toHaveBeenCalled', async () => {
        await wrapper.setData({newIP: {ip: '192.168.0.1', chain: ['web'], description: 'test'}});
        const spy = jest.spyOn(wrapper.vm, 'setNewIpParam');
        await wrapper.vm.setNewIpParam('chain', 'web');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.newIP).toStrictEqual({ip: '192.168.0.1', chain: [], description: 'test'});
        spy.mockRestore();
    });
    it('setNewIpParam toHaveBeenCalled', async () => {
        await wrapper.setData({newIP: {ip: '192.168.0.1', chain: ['web'], description: 'test'}});
        const spy = jest.spyOn(wrapper.vm, 'setNewIpParam');
        await wrapper.vm.setNewIpParam('chain', 'voip');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.newIP).toStrictEqual({ip: '192.168.0.1', chain: ['web', 'voip'], description: 'test'});
        spy.mockRestore();
    });
    it('setNewIpParam toHaveBeenCalled', async () => {
        await wrapper.setData({newIP: {ip: '192.168.0.1', chain: ['web'], description: 'test'}});
        const spy = jest.spyOn(wrapper.vm, 'setNewIpParam');
        await wrapper.vm.setNewIpParam('description', 'test2');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.newIP).toStrictEqual({ip: '192.168.0.1', chain: ['web'], description: 'test2'});
        spy.mockRestore();
    });
    it('filterData toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'filterData');
        await wrapper.vm.filterData('chain');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('filterData toHaveBeenCalled', async () => {
        await wrapper.setData({sortParams: {
            ip: 'desc',
            chain: 'desc',
            description: 'desc',
            dateUpdated: 'desc'
        }});
        const spy = jest.spyOn(wrapper.vm, 'filterData');
        await wrapper.vm.filterData('chain');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('clearQueue toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'clearQueue');
        await wrapper.vm.clearQueue();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setApply toHaveBeenCalled', async () => {
        await wrapper.setData({arrayToUpdate: [{ip: '192.168.0.1', id: [123, 124], chain: ['web', 'voip'], description: 'test'}]});
        const spy = jest.spyOn(wrapper.vm, 'setApply');
        await wrapper.vm.setApply();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setApply toHaveBeenCalled', async () => {
        await wrapper.setData({arrayToUpdate: [{ip: '192.168.0.1', id: [123], chain: ['web'], description: 'test'}]});
        const spy = jest.spyOn(wrapper.vm, 'setApply');
        await wrapper.vm.setApply();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setApply toHaveBeenCalled', async () => {
        await wrapper.setData({arrayToUpdate: [{ip: '192.168.0.1', id: [123, 125], chain: ['web'], description: 'test'}]});
        const spy = jest.spyOn(wrapper.vm, 'setApply');
        await wrapper.vm.setApply();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('isEqual toHaveBeenCalled', async () => {
    //     store.dispatch('setListFirewall', [{
    //         id: 123,
    //         ip: '192.168.0.1',
    //         chain: 'web',
    //         description: 'test'
    //     }])
    //     store.dispatch('setInitialListFirewall', [{
    //         id: 123,
    //         ip: '192.168.0.1',
    //         chain: 'voip',
    //         description: 'test'
    //     }])
    //     const spy = jest.spyOn(wrapper.vm, 'isEqual');
    //     await wrapper.vm.isEqual();
    //     expect(spy).toHaveBeenCalled();
    //     expect(wrapper.vm.edit).toStrictEqual(true);
    //     expect(wrapper.vm.arrayToUpdate).toStrictEqual([{id: [123], ip: '192.168.0.1', chain: ['web'], description: 'test'}]);
    //     spy.mockRestore();
    // })
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('test2', 'description', {id: [12], ip: '192.168.0.1', chain: ['web'], description: 'test'});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('web', 'chain', {id: [12], ip: '192.168.0.1', chain: ['web'], description: 'test'});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('voip', 'chain', {id: [12], ip: '192.168.0.1', chain: ['web'], description: 'test'});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteFirewallIP toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteFirewallIP');
        await wrapper.vm.deleteFirewallIP({id: [12], ip: '192.168.0.1', chain: ['web'], description: 'test'});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('createFirewallIP toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'createFirewallIP');
        await wrapper.vm.createFirewallIP();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('computed component', async () => {
        await WhiteListIP.computed.filtersParams.call(wrapper.vm);
    });
    it('computed component', async () => {
        await wrapper.setData({paramFilter: {ip: '', type: 'web', description: ''}});
        await WhiteListIP.computed.filtersParams.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await WhiteListIP.mounted.call(wrapper.vm);
    });
});
