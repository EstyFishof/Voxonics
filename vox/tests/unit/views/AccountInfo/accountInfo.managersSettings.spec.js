import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import ManagerSettings from '../../../../src/views/Config/Users/Accountinfo/components/ManagerSettings/ManagerSettings';
import AvailableQueues
    from '../../../../src/views/Config/Users/Accountinfo/components/ManagerSettings/components/AvailableQueues';
import Departments
    from '../../../../src/views/Config/Users/Accountinfo/components/ManagerSettings/components/Departments';
import QManaging from '../../../../src/views/Config/Users/Accountinfo/components/ManagerSettings/components/QManaging';
import user from "../EditUser/__mock__/user";
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
    relatedWith: { user: [] },
    option: {
        edit: 1
    }
};
const mockQueue2 = {
    uid: "e065083b-cbf0-4ce6-a11b-dfdb551597fe",
    name: "Manage queue",
    internalNumber: "1002",
    relatedWith: { user: [] },
    option: {
        edit: 0
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
        expect(wrapper.vm.getRole).toBeDefined();
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
        getters = { getRelatedQueues: () => [mockQueue], getQueueManaged: () => [mockQueue] };
        actions = { queueManagerSelected: jest.fn() };
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
        wrapper.vm.chooseDep({ uid: '13', edit: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseDep if not includes', () => {
        const wrapper = shallowMount(AvailableQueues, { localVue, store });
        wrapper.setData({ selectedQueueList: [{ uid: '12345', edit: true }] });
        const spy = jest.spyOn(wrapper.vm, 'chooseDep');
        wrapper.vm.chooseDep({ uid: '13', edit: false });
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
            getDepManaged: () => [mockDepartment],
            userInfoVuex: () => user,
            departments: () => [mockDepartment],
        };
        store = new Vuex.Store({ getters, actions: { setUserDepsManaged: jest.fn(), changeDeps: jest.fn() } });
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
        const spy = jest.spyOn(wrapper.vm, 'chooseManDep');
        wrapper.vm.chooseManDep({ uid: '123', edit: true });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('choose dep if not includes', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({ selectedDepList: [{ uid: '12345', edit: true }] });
        const spy = jest.spyOn(wrapper.vm, 'chooseManDep');
        wrapper.vm.chooseManDep({ uid: '123', edit: false });
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
    it('editMode related', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'editMode');
        wrapper.vm.editMode('related');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('editMode', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'editMode');
        wrapper.vm.editMode('123');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('addRelDep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({ selectedRelDep: mockDepartment });
        const spy = jest.spyOn(wrapper.vm, 'addRelDep');
        wrapper.vm.addRelDep();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseRelDep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseRelDep');
        wrapper.vm.chooseRelDep(mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteRelDep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteRelDep');
        wrapper.vm.deleteRelDep(mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('addManDep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        wrapper.setData({ selectedManDep: mockDepartment });
        const spy = jest.spyOn(wrapper.vm, 'addManDep');
        wrapper.vm.addManDep();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('deleteManDep', () => {
        const wrapper = shallowMount(Departments, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteManDep');
        wrapper.vm.deleteManDep(mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('Managers settings ==> QManaging', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters;
    let store;
    let actions;
    beforeEach(() => {
        getters = {
            userManageQueues: () => [mockQueue, mockQueue2],
            getRelatedQueues: () => [mockQueue],
            queues: () => [],
        };
        actions = {
            setUserQueuesManaged: jest.fn()
        };
        store = new Vuex.Store({ actions, getters });
    });
    it('should  instance of Vue', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('should snapshot', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('Vuex data defined', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        expect(wrapper.vm.userManageQueues).toBeDefined();
        expect(wrapper.vm.getRelatedQueues).toBeDefined();
        expect(wrapper.vm.queues).toBeDefined();
    });
    it('queue list  defined', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        expect(wrapper.vm.sort).toBeDefined();
        expect(wrapper.vm.change).toBeDefined();
        expect(wrapper.vm.showRelQueues).toBeDefined();
        expect(wrapper.vm.relQueuesValueSearch).toBeDefined();
        expect(wrapper.vm.selectedRelQueue).toBeDefined();
    });

    it('sortNumber', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'sortNumber');
        wrapper.vm.sortNumber();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sortNumber sort', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        wrapper.setData({sort: {number: true}});
        const spy = jest.spyOn(wrapper.vm, 'sortNumber');
        wrapper.vm.sortNumber('number');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sortName', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'sortName');
        wrapper.vm.sortName();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sortActions', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'sortActions');
        wrapper.vm.sortActions();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setChange', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'setChange');
        wrapper.vm.setChange();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('chooseRelQueues', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseRelQueues');
        wrapper.vm.chooseRelQueues(mockQueue);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteQueues', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteQueues');
        wrapper.vm.deleteQueues(mockQueue);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('addQueues', () => {
        const wrapper = shallowMount(QManaging, { localVue, store });
        wrapper.setData({ selectedRelQueue: mockQueue });
        const spy = jest.spyOn(wrapper.vm, 'addQueues');
        wrapper.vm.addQueues();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
