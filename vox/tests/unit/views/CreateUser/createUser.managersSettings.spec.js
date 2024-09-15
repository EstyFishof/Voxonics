import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import ManagerSettings from '../../../../src/views/Config/Users/CreateUser/components/ManagerSettings/ManagerSettings';
import AvailableQueues from '../../../../src/views/Config/Users/CreateUser/components/ManagerSettings/components/AvailableQueues';
import Departments from '../../../../src/views/Config/Users/CreateUser/components/ManagerSettings/components/Departments';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

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
const mockDepartment = {
    uid: "71b966fb-c930-481e-aa3a-3a942a6d3e59",
    name: "Manage",
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
            getRole: () => 'agent',
            theme: () => 'dark'
        };
        store = new Vuex.Store({ getters });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.vm.getRole).toBeDefined();
    });
    it('showOptions  defined', () => {
        const wrapper = shallowMount(ManagerSettings, { localVue, store });
        expect(wrapper.vm.showOptions).toBeDefined();
    });
});
describe('Managers settings => AvailableQueues', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getRelatedQueues: () => [mockQueue],
            getQueueManaged: () => [mockQueue],
            getRole: () => 'agent',
            theme: () => 'dark'
        };
        actions = {queueManagerSelected: jest.fn()};
        store = new Vuex.Store({ actions, getters });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm.getRelatedQueues).toBeDefined();
        expect(wrapper.vm.getQueueManaged).toBeDefined();
    });
    it('queueList  defined', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm.queueList).toBeDefined();
    });
    it('selectedQueueList  defined', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        expect(wrapper.vm.selectedQueueList).toBeDefined();
    });
    it('chooseDep if includes', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        wrapper.setData({selectedQueueList:[{uid: '123'}]});
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '123', edit: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseDep if not includes', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        wrapper.setData({selectedQueueList:[{uid: '12345', edit: true}]});
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '123', edit: false });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit / view === true', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.vm.setEdit({ uid: '123', view: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit/ view === false', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.setData({queueList: [mockQueue]});
        wrapper.vm.setEdit({ uid: '123', view: false });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
describe('Managers settings => Departments', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getRelatedDepartments: () => [mockDepartment],
            getDepManaged: () => [mockDepartment],
            getRole: () => 'agent',
            theme: () => 'dark'
        };
        actions = {depManagerSelected: jest.fn()};
        store = new Vuex.Store({ actions, getters });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm.getRelatedDepartments).toBeDefined();
        expect(wrapper.vm.getDepManaged).toBeDefined();
    });
    it('selectedDepList  defined', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm.depList).toBeDefined();
    });
    it('  defined', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        expect(wrapper.vm.selectedDepList).toBeDefined();
    });
    it('chooseDep if includes', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({selectedDepList:[{uid: '123'}]});
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '123', edit: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseDep if not includes', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({selectedDepList:[{uid: '12345', edit: true}]});
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '123', edit: false });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit / view === true', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.vm.setEdit({ uid: '123', view: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setEdit/ view === false', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setEdit');
        wrapper.setData({depList: [mockDepartment]});
        wrapper.vm.setEdit({ uid: '123', view: false });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
