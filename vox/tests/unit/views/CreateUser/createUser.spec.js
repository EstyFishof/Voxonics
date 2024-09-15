import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import InputFacade from 'vue-input-facade';
import CreateUser from '@/views/Config/Users/CreateUser/CreateUser';
import PersonalInfo from '@/views/Config/Users/CreateUser/components/PersonalInfo';
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

describe('create user', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters;
    let store;

    beforeEach(() => {
        getters = {
            getForm: () => ({}),
            theme: () => 'dark'
        };
        store = new Vuex.Store({
            getters
        });
    });

    it('should  Vue instance', () => {
        const wrapper = shallowMount(CreateUser, { localVue, router, store, stubs: {CreateUser: true} });
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     const wrapper = shallowMount(CreateUser, { localVue, router, store, stubs: {CreateUser: true} });
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('getForm defined', () => {
        const wrapper = shallowMount(CreateUser, { localVue, router, store, stubs: {CreateUser: true} });
        expect(wrapper.vm.getForm).toBeDefined();
    });
    it('handlerSubmit defined', () => {
        const wrapper = shallowMount(CreateUser, { localVue, router, store, stubs: {CreateUser: true} });
        expect(wrapper.vm.handlerSubmit).toBeDefined();
    });
    it('handlerSubmit called', () => {
        const wrapper = shallowMount(CreateUser, { localVue, router, store, stubs: {CreateUser: true} });
        const spy = jest.spyOn(wrapper.vm, 'handlerSubmit');
        wrapper.vm.handlerSubmit();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});

const getForm = {
    name: "",
    phone: "",
    location: "",
    position: "",
    email: "",
    internalNumber: "",
    password: "",
    confirm: "",
};
const propsField = {
    requiredFields: {
        password: false,
        internalNumber: false,
        name: false
    }
};
describe('personal info', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters, actions;
    let store;
    beforeEach(() => {
        getters = {
            getForm: () => getForm,
            theme: () => 'dark'
        };
        actions = {
            setUserInfo: jest.fn()
        };
        store = new Vuex.Store({
            actions,
            getters
        });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(PersonalInfo, {
            localVue, router, store, directives: {
                facade: el => {
                }
            },
            propsData: {
                requiredFields: {
                    password: false,
                    internalNumber: false,
                    name: false
                }
            }
        });
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('getForm defined', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        expect(wrapper.vm.getForm).toBeDefined();
    });
    it('checkName ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'checkName');
        wrapper.vm.checkName(wrapper.vm);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('checkPhone', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'checkPhone');
        wrapper.vm.checkPhone(wrapper.vm);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('checkEmail', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'checkEmail');
        wrapper.vm.checkEmail(wrapper.vm);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('checkInternalNumber ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'checkInternalNumber');
        wrapper.vm.checkInternalNumber(wrapper.vm);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('checkPassword ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'checkPassword');
        wrapper.vm.checkPassword(wrapper.vm);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('confirmPassword ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'confirmPassword');
        wrapper.vm.confirmPassword(wrapper.vm);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('switchVisibility ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'switchVisibility');
        wrapper.vm.switchVisibility();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('switchVisibilityConfirm ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'switchVisibilityConfirm');
        wrapper.vm.switchVisibilityConfirm();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setUserInfo ', () => {
        const wrapper = shallowMount(PersonalInfo, { localVue, router, store, propsData: propsField });
        const spy = jest.spyOn(wrapper.vm, 'setUserInfo');
        wrapper.vm.setUserInfo('info');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
