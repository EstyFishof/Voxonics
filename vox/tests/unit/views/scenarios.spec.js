import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ParentScenario from '@/views/Config/scenarios2/ParentScenario.vue';
import Item from '@/views/Config/scenarios2/Item.vue';
import dialConfiguration from '@/views/Config/scenarios2/components/dialConfiguration.vue';
import queueConfiguration from '@/views/Config/scenarios2/components/queueConfiguration.vue';
import vNumberConfiguration from '@/views/Config/scenarios2/components/vNumberConfiguration.vue';
import mock from './__mock__/scenario';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

describe('Scenario', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const store = new Vuex.Store({
        actions: {
            setListScenarios({commit}, value) {},
            setScenario({commit}, value) {},
            setShowConfig({commit}, value) {},
            setItemScenario({commit}, value) {},
            setChangeNameScenario({commit}, value) {},
            changeItemScenarios({commit}, value) {}
        },
        getters: {
            getListScenarios: () => mock.getListScenarios,
            getScenario: () => mock.getScenario,
            getShowConfig: () => mock.getShowConfig,
            getInitialList: () => mock.getInitialList
        }
    });

    const wrapper = shallowMount(ParentScenario, { localVue, router, store, stubs: {ParentScenario: true} });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('setScenario toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setScenario');
        await wrapper.vm.setScenario(mock.getScenario);
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.edit).toStrictEqual(false);
        expect(wrapper.vm.activeTab).toStrictEqual('/ewrwe');
        spy.mockRestore();
    });
    it('changeName toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeName');
        await wrapper.vm.changeName('123');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setName toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setName');
        await wrapper.vm.setName('123');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteScenario toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteScenario');
        await wrapper.vm.deleteScenario(mock.getScenario, 'parent');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.deleteScenarios).toStrictEqual(['3d3c5b96-8694-470d-85ad-f3e43522ff68']);
        expect(wrapper.vm.edit).toStrictEqual(true);
        spy.mockRestore();
    });
    it('deleteScenario toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteScenario');
        await wrapper.vm.deleteScenario({path: '/ewrwe/name', uid: 'delete'}, 'child');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.deleteScenarios).toStrictEqual(['3d3c5b96-8694-470d-85ad-f3e43522ff68', 'delete']);
        expect(wrapper.vm.edit).toStrictEqual(true);
        spy.mockRestore();
    });
    it('setNewScenario toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setNewScenario');
        await wrapper.vm.setNewScenario('name');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.activeTab).toStrictEqual('/name');
        expect(wrapper.vm.name.mainName).toStrictEqual('');
        expect(wrapper.vm.name.secondaryName).toStrictEqual('');
        spy.mockRestore();
    });
    it('clearChanges toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'clearChanges');
        await wrapper.vm.clearChanges();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.deleteScenarios).toStrictEqual([]);
        expect(wrapper.vm.edit).toStrictEqual(false);
        spy.mockRestore();
    });
    it('applyChanges toHaveBeenCalled', async () => {
        await wrapper.setData({deleteScenarios: [{}, {}]});
        const spy = jest.spyOn(wrapper.vm, 'applyChanges');
        await wrapper.vm.applyChanges();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('applyChanges toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'applyChanges');
        await wrapper.vm.applyChanges();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('applyChanges toHaveBeenCalled', async () => {
        await wrapper.setData({getScenario: {uid: '111'}});
        const spy = jest.spyOn(wrapper.vm, 'applyChanges');
        await wrapper.vm.applyChanges();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mounted component', () => {
        ParentScenario.mounted.call(wrapper.vm);
    });
});

describe('Item Scenario', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const store = new Vuex.Store({
        actions: {
            setListScenarios({commit}, value) {},
            setScenario({commit}, value) {},
            setShowConfig({commit}, value) {},
            setItemScenario({commit}, value) {},
            setChangeNameScenario({commit}, value) {},
            changeItemScenarios({commit}, value) {}
        },
        getters: {
            getListScenarios: () => mock.getListScenarios,
            getScenario: () => mock.getScenario,
            getShowConfig: () => mock.getShowConfig,
            getInitialList: () => mock.getInitialList,
            theme: () => 'dark',
            getItemScenario: () => mock.getItemScenario,
            getUserScenario: () => mock.getUserScenario
        }
    });

    const wrapper = shallowMount(Item, { localVue, router, store, stubs: {Item: true} });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('getTitleItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getTitleItem');
        await wrapper.vm.getTitleItem({schema: 'vnumber-in'});
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveReturnedWith({ text: 'V-Numbers', icon: wrapper.vm.icon.vnumberInBlack });
        spy.mockRestore();
    });
    it('getTitleItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getTitleItem');
        await wrapper.vm.getTitleItem({schema: 'queue', option: {name: 'q', number: '1111'}});
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveReturnedWith({ text: 'q (1111)', icon: wrapper.vm.icon.queueIconBlack });
        spy.mockRestore();
    });
    it('getTitleItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getTitleItem');
        await wrapper.vm.getTitleItem({schema: 'dial', option: {number: '123'}});
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveReturnedWith({ text: 'AAA (123)', icon: wrapper.vm.icon.dialBlack });
        spy.mockRestore();
    });
    it('getTitleItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getTitleItem');
        await wrapper.vm.getTitleItem({});
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveReturnedWith({ text: '', icon: '' });
        spy.mockRestore();
    });
    it('chooseItem toHaveBeenCalled', async () => {
        await wrapper.setData({counter: 0});
        const spy = jest.spyOn(wrapper.vm, 'chooseItem');
        await wrapper.vm.chooseItem('change', mock.getItemScenario);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseItem');
        await wrapper.vm.chooseItem('change', {schema: 'dial', option: {number: '123'}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'chooseItem');
        await wrapper.vm.chooseItem('add', {schema: 'dial', option: {number: '123'}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('dialConfiguration Scenario', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        actions: {
            setListScenarios({commit}, value) {},
            setScenario({commit}, value) {},
            setShowConfig({commit}, value) {},
            setItemScenario({commit}, value) {},
            setChangeNameScenario({commit}, value) {},
            changeItemScenarios({commit}, value) {}
        },
        getters: {
            getListScenarios: () => mock.getListScenarios,
            getScenario: () => mock.getScenario,
            getShowConfig: () => mock.getShowConfig,
            getInitialList: () => mock.getInitialList,
            theme: () => 'dark',
            getItemScenario: () => mock.getItemScenarioDial,
            getUserScenario: () => mock.getUserScenario,
        }
    });

    const wrapper = shallowMount(dialConfiguration, { localVue, router, store, dialConfiguration: {Item: true} });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('viewType toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'viewType');
        await wrapper.vm.viewType('queue');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.edit).toStrictEqual(false);
        spy.mockRestore();
    });
    it('hide toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'hide');
        await wrapper.vm.hide();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showOption).toStrictEqual('');
        spy.mockRestore();
    });
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('user', mock.getUserScenario[0]);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteItem');
        await wrapper.vm.deleteItem();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setUser toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setUser');
        await wrapper.vm.setUser();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.user).toStrictEqual({internalNumber: '123', name: 'AAA'});
        spy.mockRestore();
    });
    it('mounted component', () => {
        dialConfiguration.mounted.call(wrapper.vm);
    });
});

describe('queueConfiguration Scenario', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const store = new Vuex.Store({
        actions: {
            setListScenarios({commit}, value) {},
            setScenario({commit}, value) {},
            setShowConfig({commit}, value) {},
            setItemScenario({commit}, value) {},
            setChangeNameScenario({commit}, value) {},
            changeItemScenarios({commit}, value) {}
        },
        getters: {
            getListScenarios: () => mock.getListScenarios,
            getScenario: () => mock.getScenario,
            getShowConfig: () => mock.getShowConfig,
            getInitialList: () => mock.getInitialList,
            theme: () => 'dark',
            getItemScenario: () => mock.getItemScenarioQueue,
            getUserScenario: () => mock.getUserScenario,
            getQueuesScenarios: () => mock.getQueuesScenarios
        }
    });

    const wrapper = shallowMount(queueConfiguration, { localVue, router, store, queueConfiguration: {Item: true} });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('time', null);
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.minSec).toStrictEqual('sec');
        spy.mockRestore();
    });
    it('setOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setOptions');
        await wrapper.vm.setOptions('queue', mock.getQueuesScenarios);
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.edit).toStrictEqual(true);
        expect(wrapper.vm.queue).toStrictEqual(mock.getQueuesScenarios);
        spy.mockRestore();
    });
    it('hide toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'hide');
        await wrapper.vm.hide();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showOption).toStrictEqual('');
        spy.mockRestore();
    });
    it('viewType toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'viewType');
        await wrapper.vm.viewType('dial');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.edit).toStrictEqual(false);
        spy.mockRestore();
    });
    it('deleteItem toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteItem');
        await wrapper.vm.deleteItem();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setChanges toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setChanges');
        await wrapper.vm.setChanges();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setQueue toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setQueue');
        await wrapper.vm.setQueue();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.queue).toStrictEqual(mock.getQueuesScenarios);
        expect(wrapper.vm.maxWait).toStrictEqual(3600);
        spy.mockRestore();
    });
    it('mounted component', () => {
        queueConfiguration.mounted.call(wrapper.vm);
    });
});

describe('vNumberConfiguration Scenario', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const store = new Vuex.Store({
        actions: {
            setListScenarios({commit}, value) {},
            setScenario({commit}, value) {},
            setShowConfig({commit}, value) {},
            setItemScenario({commit}, value) {},
            setChangeNameScenario({commit}, value) {},
            changeItemScenarios({commit}, value) {}
        },
        getters: {
            getListScenarios: () => mock.getListScenarios,
            getScenario: () => mock.getScenario,
            getShowConfig: () => mock.getShowConfig,
            getInitialList: () => mock.getInitialList,
            theme: () => 'dark',
            getItemScenario: () => mock.getItemScenario,
            getUserScenario: () => mock.getUserScenario,
            getQueuesScenarios: () => mock.getQueuesScenarios,
            getExternalNumbers: () => mock.getExternalNumbers,
            getCountriesScenario: () => mock.getCountriesScenario
        }
    });

    const wrapper = shallowMount(vNumberConfiguration, { localVue, router, store, vNumberConfiguration: {Item: true} });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('delVNumber toHaveBeenCalled', async () => {
        await wrapper.setData({selectedNumbers: ["380443640000"]});
        const spy = jest.spyOn(wrapper.vm, 'delVNumber');
        await wrapper.vm.delVNumber("380443640000");
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.selectedNumbers).toStrictEqual([]);
        spy.mockRestore();
    });
    it('toggleVisible toHaveBeenCalled', async () => {
        await wrapper.setData({showOption: 'left'});
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        await wrapper.vm.toggleVisible('left');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showOption).toStrictEqual('');
        spy.mockRestore();
    });
    it('toggleVisible toHaveBeenCalled', async () => {
        await wrapper.setData({showOption: 'left'});
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        await wrapper.vm.toggleVisible('right');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showOption).toStrictEqual('right');
        spy.mockRestore();
    });
    it('addVNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'addVNumber');
        await wrapper.vm.addVNumber("380443640000");
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.selectedNumbers).toStrictEqual(["380443640000"]);
        spy.mockRestore();
    });
    it('setFiltersParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFiltersParam');
        await wrapper.vm.setFiltersParam('allNumbers', false, 'array', mock.getCountriesScenario);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFiltersParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFiltersParam');
        await wrapper.vm.setFiltersParam('allNumbers', "Afghanistan", 'array', mock.getCountriesScenario);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setFiltersParam toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setFiltersParam');
        await wrapper.vm.setFiltersParam('selectedNumbers', 'begin', 'object');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('clearFilters toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'clearFilters');
        await wrapper.vm.clearFilters('allNumbers');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.filterParams.allNumbers.vNumber).toStrictEqual({key: 'begin', value: ''});
        expect(wrapper.vm.filterParams.allNumbers.countries).toStrictEqual([]);
        expect(wrapper.vm.filterParams.allNumbers.description).toStrictEqual('');
        expect(wrapper.vm.filterParams.allNumbers.status).toStrictEqual([]);
        spy.mockRestore();
    });
    it('filterNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'filterNumber');
        await wrapper.vm.filterNumber({key: 'begin', value: '38'}, "380443640000");
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('filterNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'filterNumber');
        await wrapper.vm.filterNumber({key: 'contain', value: '38'}, "380443640000");
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('filterNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'filterNumber');
        await wrapper.vm.filterNumber({key: 'end', value: '38'}, "380443640000");
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('filterNumber toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'filterNumber');
        await wrapper.vm.filterNumber({key: 'equal', value: '38'}, "380443640000");
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('hide toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'hide');
        await wrapper.vm.hide();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.showOption).toStrictEqual('');
        spy.mockRestore();
    });
    it('hideListOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'hideListOptions');
        await wrapper.vm.hideListOptions();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('addFlagToNumber toHaveBeenCalled', async () => {
    //     const spy = jest.spyOn(wrapper.vm, 'addFlagToNumber');
    //     await wrapper.vm.addFlagToNumber();
    //     expect(spy).toHaveBeenCalled();
    //     expect(wrapper.vm.edit).toStrictEqual(true);
    //     expect(wrapper.vm.queue).toStrictEqual(mock.getQueuesScenarios);
    //     spy.mockRestore();
    // })
    it('computed agentsFiltered', () => {
        vNumberConfiguration.computed.getCountries.get.call(wrapper.vm);
    });
    // it('computed agentsFiltered', async () => {
    //     await wrapper.setData({
    //         selectedNumbers: [{description: '', country: 'Ukraine'}], 
    //         getExternalNumbers: [{description: '', country: 'Ukraine'}]
    //     })
    //     vNumberConfiguration.computed.selectedNumbersFilter.call(wrapper.vm)
    // })
    it('computed agentsFiltered', async () => {
        await wrapper.setData({
            selectedNumbers: [{description: '', country: 'Ukraine', number: '0880640822'}], 
            getExternalNumbers: [{description: '', country: 'Ukraine', number: '0880640822'}]
        });
        vNumberConfiguration.computed.relatedNumbersFilter.call(wrapper.vm);
    });
    it('mounted component', () => {
        vNumberConfiguration.mounted.call(wrapper.vm);
    });
});