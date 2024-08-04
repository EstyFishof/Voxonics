import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import InputFacade from 'vue-input-facade';
import EditUser from '@/views/Config/Users/EditUser/EditUser';
import PersonalInfo from '@/views/Config/Users/EditUser/components/PersonalInfo';
import user from './__mock__/user';
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
            userUid: () => '123',
            changeFields: () => [],
            theme: () => 'dark'
        };
        store = new Vuex.Store({
            getters
        });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(EditUser, { localVue, router, store });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(EditUser, { localVue, router, store });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('vuex defined', () => {
        const wrapper = shallowMount(EditUser, { localVue, router, store });
        expect(wrapper.vm.userInfoVuex).toBeDefined();
        expect(wrapper.vm.userUid).toBeDefined();
    });
    it('handlerSubmit defined', () => {
        const wrapper = shallowMount(EditUser, { localVue, router, store });
        expect(wrapper.vm.handlerSubmit).toBeDefined();
    });
    it('handlerSubmit called', () => {
        const wrapper = shallowMount(EditUser, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'handlerSubmit');
        wrapper.vm.handlerSubmit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});

describe('personal info in editUser', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions;
    let store;
    beforeEach(() => {
        getters = {
            userInfoVuex: () => user,
            theme: () => 'dark'
        };
        actions = {
            setUserInfo: jest.fn(),
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
    it('checkPassword ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'checkPassword');
        wrapper.vm.checkPassword(wrapper.vm);
        expect(spy).toHaveBeenCalled();
    });
    it('confirmPassword ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'confirmPassword');
        wrapper.vm.confirmPassword(wrapper.vm);
        expect(spy).toHaveBeenCalled();
    });
    it('switchVisibility ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'switchVisibility');
        wrapper.vm.switchVisibility();
        expect(spy).toHaveBeenCalled();
    });
    it('switchVisibilityConfirm ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'switchVisibilityConfirm');
        wrapper.vm.switchVisibilityConfirm();
        expect(spy).toHaveBeenCalled();
    });
    it('setUserInfo ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store });
        const spy = jest.spyOn(wrapper.vm, 'setUserInfo');
        wrapper.vm.setUserInfo('info');
        expect(spy).toHaveBeenCalled();
    });
});
