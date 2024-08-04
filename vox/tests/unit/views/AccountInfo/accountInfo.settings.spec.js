import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AgentSetup from '@/views/Config/Users/Accountinfo/components/AgentSetup';
import QSettings from '@/views/Config/Users/Accountinfo/components/QSettings';
import user from "../EditUser/__mock__/user";
import PersonalInfo from "@/views/Config/Users/Accountinfo/components/PersonalInfo";
import Permission from "@/views/Config/Users/Accountinfo/components/Permission";
import FileLoader from "@/views/Config/Users/Accountinfo/components/FileLoader";
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
            userRole: () => 'manager',
        };
        actions = {
            changeRole: jest.fn(),
            departmentsSelected: jest.fn(),
            setVNumber: jest.fn()
        };
        store = new Vuex.Store({ actions, getters });
    });
    it('it should  Vue instance', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('selectRole', () => {
        const wrapper = shallowMount(AgentSetup, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectRole');
        wrapper.vm.selectRole({ target: 'classname' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});

describe('qsettings / edit', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const reactiveData = [
        'showOptions',
        'relatedQueues',
        'selectedQueues',
        'dataQueues',
        'unsubscribe',];
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getRelatedQueues: () => [{name: 'default', internalNumber: '0000', userCount: 10, uid: 'err23-23qts'}],
            userQueues: () => [],
            userInfoVuex: () => user,
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
        expect(wrapper.vm.userInfoVuex).toBeDefined();
    });
    test.each(reactiveData)('should data defined', (prop) => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        expect(wrapper.vm[prop]).toBeDefined();
    });
    it('selectQueues empty', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectQ');
        wrapper.vm.selectQ({ uid: '123' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectQueues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectQ');
        wrapper.setData({ selectedQueues: [{ uid: '123' }] });
        wrapper.vm.selectQ({ uid: '123' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteQueue empty', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteQ');
        wrapper.vm.deleteQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteQueue', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'deleteQ');
        wrapper.vm.deleteQ({ uid: '123' });
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.selectedQueues).toStrictEqual([{}]);
        spy.mockRestore();
    });
    it('selectAll Queues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectAllQ');
        wrapper.vm.selectAllQ();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('removeAll Queues', () => {
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
    it('unsubscribe store', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'unsubscribe');
        wrapper.vm.unsubscribe();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('selectedQueues', () => {
        const wrapper = shallowMount(QSettings, { localVue, store });
        wrapper.setData({ selectedQueues: wrapper.vm.userQueues });
        expect(wrapper.vm.selectedQueues).toEqual([]);
    });
});

const billing = {
    billing: true
};
const cdr = {
    billing: 'all',
    export: 'all',
    listen: 'all',
    view: 'all'
};

describe('permission', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions, store;
    beforeEach(() => {
        getters = {
            getSelectedDepartments: () => [],
            outInfo: () => [],
            VNumber: () => 'manager',
            userRole: () => 'manager',
            getPermissionBilling: () => billing,
            getPermissionCDR: () => cdr,
            getSecret: () => '',
            userInfo: () => {123;}
        };
        actions = { changeRole: jest.fn() };

        store = new Vuex.Store({ actions, getters });
    });
    it('it should  Vue instance', () => {
        const wrapper = shallowMount(Permission, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(Permission, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('check data', () => {
        const wrapper = shallowMount(Permission, { localVue, store });
        expect(wrapper.vm.showRole).toBeDefined();
        expect(wrapper.vm.showOutNum).toBeDefined();
        // expect(wrapper.vm.selectedNumber).toBeDefined();
    });
    it('selectRole', () => {
        const wrapper = shallowMount(Permission, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'selectRole');
        wrapper.vm.selectRole('Agent');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toggleVisible', () => {
        const wrapper = shallowMount(Permission, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        wrapper.vm.toggleVisible({ target: 'classname' });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('file-loader', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, store;
    beforeEach(() => {
        getters = {
            userUid: () => '',
            userAva: () => '',
        };

        store = new Vuex.Store({ getters });
    });
    it('it should  Vue instance', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('check data', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        expect(wrapper.vm.preview).toBeDefined();
        expect(wrapper.vm.img).toBeDefined();
    });
    it('handleFileUpload', () => {
        const wrapper = shallowMount(FileLoader, { localVue, store });
        const spy = jest.spyOn(wrapper.vm, 'handleFileUpload');
        wrapper.vm.handleFileUpload();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
