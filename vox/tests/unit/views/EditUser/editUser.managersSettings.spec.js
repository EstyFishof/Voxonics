import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import ManagerSettings from '../../../../src/views/Config/Users/EditUser/components/ManagerSettings/ManagerSettings';
import AvailableQueues
    from '../../../../src/views/Config/Users/EditUser/components/ManagerSettings/components/AvailableQueues';
import Departments from '../../../../src/views/Config/Users/EditUser/components/ManagerSettings/components/Departments';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

const mockDepartment = {
    uid: "71b966fb-c930-481e-aa3a-3a942a6d3e59",
    name: "Manage",
    option: {
        edit: 1
    }
};

const mockQueue = {
    uid: "e065083b-cbf0-4ce6-a11b-dfdb551597fe",
    name: "Manage queue",
    internalNumber: "1001",
    strategy: "ringall",
    timeout: 21,
    retry: 0,
    ringinuse: "yes",
    maxlen: "0",
    music: "default",
    weight: 0,
    joinempty: "yes",
    leavewhenempty: "no",
    penaltymemberslimit: 20,
    relatedWith: { user: [] },
    option: {
        edit: 1
    }
};

describe('Managers settings', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, store;
    beforeEach(() => {
        getters = {
            userRole: () => 'agent',
        };
        store = new Vuex.Store({ getters });
    });

    it('Check snapshot', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Vuex data defined', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.vm.userRole).toBeDefined();
    });
    it('show options  defined', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.vm.showOptions).toBeDefined();
    });
});
describe('Managers settings ==> AvailableQueues', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters;
    let store;
    let actions;
    beforeEach(() => {
        getters = { getRelatedQueues: () => [mockQueue], getQueueManaged: () => [mockQueue], userRole: () => 'agent', };
        actions = { queueManagerSelected: jest.fn(), setUserQueuesManaged: jest.fn()};
        store = new Vuex.Store({ actions, getters });
    });
    it('should  instance of Vue', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('should snapshot', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('Vuex data defined', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm.getRelatedQueues).toBeDefined();
        expect(wrapper.vm.getQueueManaged).toBeDefined();
    });
    it('queue list  defined', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm.queueList).toBeDefined();
    });
    it('selected queue list  defined', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm.selectedQueueList).toBeDefined();
    });
    it('choose dep if includes', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        wrapper.setData({ selectedQueueList: [{ uid: '13' }] });
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '13', option: {edit: true} });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseDep if not includes', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        wrapper.setData({ selectedQueueList: [{ uid: '12345', edit: true }] });
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '13', option: {edit: false} });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit  view === true', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.vm.setEdit({ uid: '13', view: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit view === false', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.setData({ queueList: [mockQueue] });
        wrapper.vm.setEdit({ uid: '13', view: false });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
describe('Managers settings ==> Departments / edit', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getRelatedDepartments: () => [mockDepartment],
            userManageDeps: () => [mockDepartment],
            userRole: () => 'agent',
        };
        store = new Vuex.Store({ getters, actions: { setUserDepsManaged: jest.fn() } });
    });
    it('it should  Vue instance', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('check snapshot dep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined in dep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm.getRelatedDepartments).toBeDefined();
        expect(wrapper.vm.userManageDeps).toBeDefined();
    });
    it('dep list  defined', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm.depList).toBeDefined();
    });
    it('selected deps defined', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm.selectedDepList).toBeDefined();
    });
    it('choose dep if includes', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({ selectedDepList: [{ uid: '123' }] });
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '123', option: {edit: true} });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('choose dep if not includes', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({ selectedDepList: [{ uid: '12345', edit: true }] });
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '123', option: {edit: false} });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit / view == true', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.vm.setEdit({ uid: '123', view: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit/ view == false', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.setData({ depList: [mockDepartment] });
        wrapper.vm.setEdit({ uid: '123', view: false });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
