import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AgentSetup from '@/views/Config/Users/CreateUser/components/AgentSetup';
import QSettings from '@/views/Config/Users/CreateUser/components/QSettings';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

describe('agent setup', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getSearchUsers: () => [],
            getRelatedDepartments: () => [],
            getSelectedDepartments: () => [],
            getOutboundDirection: () => '123',
            outInfo: () => [],
            VNumber: () => '123',
            getRole: () => 'agent',
            theme: () => 'dark'
        };
        actions = { setRole: jest.fn(), setVNumber: jest.fn(), departmentsSelected: jest.fn() };
        store = new Vuex.Store({ actions, getters });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.vm.getSearchUsers).toBeDefined();
        expect(wrapper.vm.getRelatedDepartments).toBeDefined();
        expect(wrapper.vm.getSelectedDepartments).toBeDefined();
        expect(wrapper.vm.getOutboundDirection).toBeDefined();
        expect(wrapper.vm.outInfo).toBeDefined();
        expect(wrapper.vm.VNumber).toBeDefined();
        expect(wrapper.vm.getRole).toBeDefined();
    });
    it('markedDepartments  defined', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.vm.markedDepartments).toBeDefined();
    });
    it('selectRole', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectRole');
        wrapper.vm.selectRole({ target: '123' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toggleVisible', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        wrapper.vm.toggleVisible();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('searchUser empty', () => {
    //     const wrapper = shallowMount(AgentSetup, { localVue, store });
    //     const spy = jest.spyOn(wrapper.vm, 'searchUser');
    //     wrapper.vm.searchUser();
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('searchUser', () => {
    //     const wrapper = shallowMount(AgentSetup, { localVue, store });
    //     wrapper.setData({ search: 'aaa' })
    //     const spy = jest.spyOn(wrapper.vm, 'searchUser');
    //     wrapper.vm.searchUser();
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    it('chooseAgent', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        wrapper.vm.chooseAgent();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseDepartments', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseDepartments');
        wrapper.vm.chooseDepartments();
        expect(spy).toHaveBeenCalled();
        let deps = "";
        let markedDepartments = `${wrapper.vm.getSelectedDepartments.length} selected (${deps})`;
        expect(markedDepartments).toBe('0 selected ()');
        markedDepartments = markedDepartments.slice(0, 30) + '...';
        expect(markedDepartments).toBe('0 selected ()...');
        spy.mockRestore();
    });
    it('chooseDepartments', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseDepartments');
        wrapper.vm.chooseDepartments({ name: '', uid: 123 });
        expect(spy).toHaveBeenCalled();
        let deps = "";
        let markedDepartments = `${wrapper.vm.getSelectedDepartments.length} selected (${deps})`;
        expect(markedDepartments).toBe('1 selected ()');
        markedDepartments = markedDepartments.slice(0, 30) + '...';
        expect(markedDepartments).toBe('1 selected ()...');
        spy.mockRestore();
    });
    it('chooseNumber', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        wrapper.vm.chooseNumber();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('VNumber', () => {
        getters = {
            getSearchUsers: () => [],
            getRelatedDepartments: () => [],
            getSelectedDepartments: () => [],
            getOutboundDirection: () => '123',
            outInfo: () => [{ uid: 123, number: 123 }],
            VNumber: () => 123,
            getRole: () => 'agent',
            theme: () => 'dark'
        };
        actions = { setRole: jest.fn(), setVNumber: jest.fn() };
        store = new Vuex.Store({ actions, getters });
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        wrapper.vm.chooseNumber();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('result', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const result = wrapper.vm.outInfo.map(num => {
            if (num.uid === wrapper.vm.VNumber) {
                wrapper.vm.selectedNumber = num.number;
                return num;
            }
        });
        expect(result).toHaveLength(0);
    });

});
describe('queue settings', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const reactiveData = ['showOptions',
        'relatedQueues',
        'selectedQueues',
        'dataQueues',];
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getRelatedQueues: () => [],
            getSelectedQueues: () => ['123'],
            theme: () => 'dark'
        };
        actions = { queuesSelected: jest.fn() };
        store = new Vuex.Store({ actions, getters });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm.getRelatedQueues).toBeDefined();
        expect(wrapper.vm.getSelectedQueues).toBeDefined();
    });
    test.each(reactiveData)('data defined', (property) => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm[property]).toBeDefined();
    });
    it('selectQ empty', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectQ');
        wrapper.vm.selectQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectQ', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectQ');
        wrapper.setData({ selectedQueues: ['123'] });
        wrapper.vm.selectQ('123');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteQ empty', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteQ');
        wrapper.vm.deleteQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteQ', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteQ');
        wrapper.vm.deleteQ('123');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.selectedQueues ).toStrictEqual([]);
        spy.mockRestore();
    });
    it('selectAllQ', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectAllQ');
        wrapper.vm.selectAllQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('removeAllQ', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'removeAllQ');
        wrapper.vm.removeAllQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('dispatchSelectedQueues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'dispatchSelectedQueues');
        wrapper.vm.dispatchSelectedQueues(jest.fn(), '');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
