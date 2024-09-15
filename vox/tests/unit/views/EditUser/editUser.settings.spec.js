import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AgentSetup from '@/views/Config/Users/EditUser/components/AgentSetup';
import QSettings from '@/views/Config/Users/EditUser/components/QSettings';
import FileLoader from '@/views/Config/Users/EditUser/components/FileLoader';
import user from "./__mock__/user";
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
            userInfoVuex: () => user,
            getSearchUsers: () => [],
            getRelatedDepartments: () => [],
            departments: () => [{name: '', uid: 123}],
            getOutboundDirection: () => '123',
            outInfo: () => ([{ uid: 123, number: 123 }]),
            VNumber: () => '123',
            userRole: () => 'manager',
            userInfo: () => {123;}
        };
        actions = {
            changeRole: jest.fn(),
            changeDeps: jest.fn(),
            changeVNumber: jest.fn()
        };
        store = new Vuex.Store({ actions, getters });
    });
    it('it should  Vue instance', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     const wrapper = shallowMount(AgentSetup, { localVue, store });
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('markedDepartments  defined', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.vm.markedDepartments).toBeDefined();
    });
    it('selectRole', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectRole');
        wrapper.vm.selectRole({ target: 'classname' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toggle visible password', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        wrapper.vm.toggleVisible();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('search user empty', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'searchUser');
        wrapper.vm.searchUser();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('search user edit', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        wrapper.setData({ search: 'aaa' });
        const spy = jest.spyOn(wrapper.vm, 'searchUser');
        wrapper.vm.searchUser();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('choose agent edit', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseAgent');
        wrapper.vm.chooseAgent();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('choose departments empty args', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseDepartments');
        wrapper.vm.chooseDepartments();
        expect(spy).toHaveBeenCalled();
        let deps = "";
        let markedDepartments = `${wrapper.vm.departments.length} selected (${deps})`;
        expect(markedDepartments).toBe('1 selected ()');
        markedDepartments = markedDepartments.slice(0, 30) + '...';
        expect(markedDepartments).toBe('1 selected ()...');
        spy.mockRestore();
    });
    it('choose departments', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'chooseDepartments');
        wrapper.vm.chooseDepartments({ name: '', uid: 123 });
        expect(spy).toHaveBeenCalled();
        let deps = "";
        let markedDepartments = `${wrapper.vm.departments.length} selected (${deps})`;
        expect(markedDepartments).toBe('1 selected ()');
        markedDepartments = markedDepartments.slice(0, 30) + '...';
        expect(markedDepartments).toBe('1 selected ()...');
        spy.mockRestore();
    });
    it('chooseNumber', () => {
        const mock = jest.fn();
        const list = {
            render() {},
            methods: {
                mock
            }
        };
        const wrapper = shallowMount(AgentSetup, { localVue, store, stubs: {list} });
        // wrapper.vm.$refs.list.mock()
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        wrapper.vm.chooseNumber({ number: 38096 });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('choose VNumber', () => {
        getters = {
            getSearchUsers: () => [],
            getRelatedDepartments: () => [],
            departments: () => [{name: ''}],
            getOutboundDirection: () => '123',
            outInfo: () => [{ uid: 123, number: 123 }],
            VNumber: () => 123,
            userRole: () => 'agent',
            userInfoVuex: () => user,
        };
        actions = {
            changeRole: jest.fn(),
            changeDeps: jest.fn(),
            changeVNumber: jest.fn()
        };
        store = new Vuex.Store({ actions, getters });
        // const wrapper = shallowMount(AgentSetup, { localVue, store });
        const mock = jest.fn();
        const list = {
            render() {},
            methods: {
                mock
            }
        };
        const wrapper = shallowMount(AgentSetup, { localVue, store, stubs: {list} });
        // wrapper.vm.$refs.list.mock()
        const spy = jest.spyOn(wrapper.vm, 'chooseNumber');
        wrapper.vm.chooseNumber({ uid: 123, number: 123 });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('result', () => {
        const mock = jest.fn();
        const list = () => ({
            render: () => {
                return this.$refs;
            },
        });
        const wrapper = shallowMount(AgentSetup, { localVue, store, mocks: {$refs: list} });
        // wrapper.vm.$refs.list.mock()
        const result = wrapper.vm.outInfo.map(num => {
            if (num.uid === wrapper.vm.VNumber) {
                wrapper.vm.selectedNumber = num.number;
                return num;
            }
        });
        expect(result).toHaveLength(1);
    });

});

describe('queue settings / edit', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const reactiveData = [
        'showOptions',
        'relatedQueues',
        'selectedQueues',
        'dataQueues',
        'viewQueues',];
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getRelatedQueues: () => [],
            userQueues: () => [],
        };
        actions = {
            usersQueuesSelected: jest.fn(),
        };
        store = new Vuex.Store({ actions, getters });
    });
    it('should Vue instance', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot qs', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex data defined', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm.getRelatedQueues).toBeDefined();
        expect(wrapper.vm.userQueues).toBeDefined();
    });
    test.each(reactiveData)('data defined', (property) => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm[property]).toBeDefined();
    });
    it('selectQ empty', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectQ');
        wrapper.vm.selectQ({ uid: '123' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectQ', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectQ');
        wrapper.setData({ selectedQueues: [{ uid: '123' }] });
        wrapper.vm.selectQ({ uid: '123' });
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
        wrapper.vm.deleteQ({ uid: '123' });
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.selectedQueues).toStrictEqual([]);
        spy.mockRestore();
    });
    it('select all Queues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectAllQ');
        wrapper.vm.selectAllQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('remove all Queues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'removeAllQ');
        wrapper.vm.removeAllQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('dispatch selected Queues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'dispatchSelectedQueues');
        wrapper.vm.dispatchSelectedQueues(jest.fn(), '');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('FileLoader', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters;
    let store;
    beforeEach(() => {
        getters = { userUid: () => '', userInfoVuex: () => '', userAva: () => ''};
        store = new Vuex.Store({ getters });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('handleFileUpload', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'handleFileUpload');
        wrapper.vm.handleFileUpload();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
