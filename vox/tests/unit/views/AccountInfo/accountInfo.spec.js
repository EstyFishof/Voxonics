import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import InputFacade from 'vue-input-facade';
import AccountInfo from '@/views/Config/Users/Accountinfo/Accountinfo';
import PersonalInfo from '@/views/Config/Users/Accountinfo/components/PersonalInfo';
import user from "../EditUser/__mock__/user";
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
localVue.directive('facade', {
    inserted: function (el) {
        const e = el;
    }
});
const router = new VueRouter();

describe('edit user', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters;
    let store;

    beforeEach(() => {
        getters = {
            userInfoVuex: () => user,
            userUid: () => '',
            departments: () => [],
            userInfo: () => user,
            changeFields: () => [],
            userInfoComponent: () => {{'agent';}},
            roleAgent: () => 'manager'
        };
        store = new Vuex.Store({
            getters
        });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex defined', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        expect(wrapper.vm.userInfoVuex).toBeDefined();
        expect(wrapper.vm.userUid).toBeDefined();
        expect(wrapper.vm.departments).toBeDefined();
    });
    it('data defined', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        expect(wrapper.vm.showOptions).toBeDefined();
        expect(wrapper.vm.array).toBeDefined();
        expect(wrapper.vm.edit).toBeDefined();
    });
    it('set show options', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'setShowOptions');
        wrapper.vm.setShowOptions('blabla');
        expect(wrapper.vm.showOptions).toEqual('blabla');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('clearUser', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'clearUser');
        wrapper.vm.clearUser();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('handlerSubmit', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'handlerSubmit');
        wrapper.vm.handlerSubmit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('switchMode', () => {
        const wrapper = shallowMount(AccountInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'switchMode');
        wrapper.vm.switchMode();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});

describe('personal info in AccountInfo', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions;
    let store;
    const mockUserInfoComponent = {
        permission: {
            role: 'agent'
        }
    };
    beforeEach(() => {
        getters = {
            userInfoVuex: () => user,
            userInfo: () => user,
            userInfoComponent: () => mockUserInfoComponent,
            roleAgent: () => 'manager'
        };
        actions = {
            changeUserInfo: jest.fn()
        };
        store = new Vuex.Store({
            actions,
            getters
        });
    });
    it('should Vue instance', () => {
        const wrapper = shallowMount(PersonalInfo, {
            localVue, router, store, directives: {
                facade: el => {
                }
            }
        });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('userInfoVuex defined', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        expect(wrapper.vm.userInfoVuex).toBeDefined();
    });
    it('checkName ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'checkName');
        wrapper.vm.checkName(wrapper.vm);
        expect(spy).toHaveBeenCalled();
    });
    it('checkPhone', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'checkPhone');
        wrapper.vm.checkPhone(wrapper.vm);
        expect(spy).toHaveBeenCalled();
    });
    it('checkEmail', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'checkEmail');
        wrapper.vm.checkEmail(wrapper.vm);
        expect(spy).toHaveBeenCalled();
    });
    it('checkInternalNumber ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'checkInternalNumber');
        wrapper.vm.checkInternalNumber(wrapper.vm);
        expect(spy).toHaveBeenCalled();
    });
    it('changeUserInfo ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'changeUserInfo');
        wrapper.vm.changeUserInfo('info');
        expect(spy).toHaveBeenCalled();
    });
});
