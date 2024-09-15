import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Filters from '@/views/Reports/CDR/components/Filters.vue';
import View from '@/views/Reports/CDR/components/View.vue';
import mock from './__mock__/cdr';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
// localVue.use(Vuex)

window.env = {
    BASE_URL: 'http://168.119.92.172/'
};

const paginator = {peerPage: 10, page: 1, paginator: {count: 50, recordsPerPage: 5}};

describe('Filters', () => {

    const store = new Vuex.Store({
        getters: {
            getUsersCDR: () => mock.getUsersCDR,
            getCountry: () => mock.getCountry,
            getPageCDR: () => mock.getPageCDR,
            getPeerPageCDR: () => mock.getPeerPageCDR,
            getPaginatorCDR: () => paginator
        }
    });

    const wrapper = shallowMount(Filters, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('clear toHaveBeenCalled', async () => {
        await wrapper.setData({paramsFilter: {user: [{name: ''}]}});
        const spy = jest.spyOn(wrapper.vm, 'clear');
        await wrapper.vm.clear();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.paramsFilter.user).toStrictEqual([]);
        spy.mockRestore();
    });
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('endHours', '20', 'showEndHours');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.endHours).toStrictEqual('20');
        spy.mockRestore();
    });
    it('datePicker toHaveBeenCalled', async () => {
        await wrapper.setData({date: {end: '', start: ''}});
        const spy = jest.spyOn(wrapper.vm, 'datePicker');
        await wrapper.vm.datePicker();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.endHours).toStrictEqual('23');
        expect(wrapper.vm.endMin).toStrictEqual('59');
        expect(wrapper.vm.persistent).toStrictEqual(false);
        spy.mockRestore();
    });
    it('showPicker toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'showPicker');
        await wrapper.vm.showPicker();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.persistent).toStrictEqual(true);
        spy.mockRestore();
    });
    it('fetch toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'fetch');
        await wrapper.vm.fetch();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('clearDate toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'clearDate');
        await wrapper.vm.clearDate();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.startHours).toStrictEqual('23');
        expect(wrapper.vm.startMin).toStrictEqual('59');
        expect(wrapper.vm.endHours).toStrictEqual('00');
        expect(wrapper.vm.endMin).toStrictEqual('00');
        spy.mockRestore();
    });
    it('toggleVisible toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        await wrapper.vm.toggleVisible('a');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showList).toStrictEqual('a');
        spy.mockRestore();
    });
    it('toggleVisible toHaveBeenCalled', async () => {
        await wrapper.setData({showList: 'a'});
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        await wrapper.vm.toggleVisible('a');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showList).toStrictEqual('');
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('user', false, 'array', store.getters.getUsersCDR);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('user', store.getters.getUsersCDR[0], 'array', store.getters.getUsersCDR);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('VNumber.key', false, 'object');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('VNumber.key', 'between', 'object');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('duration.value', {from: '20'}, 'object');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('VNumber.key', 'object', 'object');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFilterParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFilterParam');
        await wrapper.vm.setFilterParam('callType', 'inbound', 'string');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('showDatePicker toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'showDatePicker');
    //     await wrapper.vm.showDatePicker();
    //     expect(spy).toHaveBeenCalled();
    //     expect(wrapper.vm.persistent).toStrictEqual(true);
    //     expect(wrapper.vm.isOpenDatePicker).toStrictEqual(true);
    //     spy.mockRestore();
    // })
    // it('showDatePicker toHaveBeenCalled', async () => {
    //     await wrapper.setData({isOpenDatePicker: true})
    //     const spy = jest.spyOn(wrapper.vm, 'showDatePicker');
    //     await wrapper.vm.showDatePicker();
    //     expect(spy).toHaveBeenCalled();
    //     expect(wrapper.vm.persistent).toStrictEqual(false);
    //     expect(wrapper.vm.isOpenDatePicker).toStrictEqual(false);
    //     spy.mockRestore();
    // })
    // it('computed getDate', () => {
    //     Filters.computed.getDate.get.call(wrapper.vm)
    // })
    it('computed getUserSearch', () => {
        Filters.computed.getUserSearch.get.call(wrapper.vm);
    });
    it('computed getNumbersSearch', () => {
        Filters.computed.getNumbersSearch.get.call(wrapper.vm);
    });
    it('computed getCountrySearch', () => {
        Filters.computed.getCountrySearch.get.call(wrapper.vm);
    });
    it('computed viewUsers', () => {
        Filters.computed.viewUsers.call(wrapper.vm);
    });
    it('computed viewUserNumbers', () => {
        Filters.computed.viewUserNumbers.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await Filters.mounted.call(wrapper.vm);
    });
});

describe('View', () => {

    const store = new Vuex.Store({
        getters: {
            getCDR: () => mock.getCDR,
            userInfo: () => mock.userInfo,
            theme: () => mock.theme,
        }
    });

    const wrapper = shallowMount(View, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('download toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'download');
        await wrapper.vm.download({id: '123'});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('createPlayer toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'createPlayer');
        await wrapper.vm.createPlayer(store.getters.getCDR.uniqueid);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('setTimeControl toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'setTimeControl');
    //     await wrapper.vm.setTimeControl(store.getters.getCDR.uniqueid);
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('setTime toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'setTime');
    //     await wrapper.vm.setTime(store.getters.getCDR.uniqueid);
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('jumpTime toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'jumpTime');
    //     await wrapper.vm.jumpTime('fw');
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('jumpTime toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'jumpTime');
    //     await wrapper.vm.jumpTime("back");
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    it('setVolume toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setVolume');
        await wrapper.vm.setVolume(store.getters.getCDR.uniqueid);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('computed elapsed', () => {
        View.computed.elapsed.call(wrapper.vm);
    });
    it('computed finished', () => {
        View.computed.finished.call(wrapper.vm);
    });
    it('computed finished', () => {
        wrapper.setData({finish: 700});
        View.computed.finished.call(wrapper.vm);
    });
});
