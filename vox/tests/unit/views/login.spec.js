import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import User from '@/API/effects/User';
import Login from '../../../src/views/Login';

jest.mock('@/API/effects/User');

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Login', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    let getters;
    let store;
    let wrapper;

    beforeEach(() => {
        getters = {
            authStatus: () => ""
        };
        store = new Vuex.Store({ getters });
        wrapper = shallowMount(Login, { store, localVue, stubs: {Login: true} });
    });
    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('Input username', () => {
        expect(wrapper.find('.login-field').exists()).toBe(true);
    });
    it('Input password', () => {
        expect(wrapper.find('.password-field').exists()).toBe(true);
    });
    it('button login', () => {
        expect(wrapper.find('.btn-login').exists()).toBe(true);
    });
    it('login setData username', async () => {
        await wrapper.setData({ form: { internalNumber: 'admin' } });
        expect(wrapper.find('.login-field').element.value).toBe('admin');
    });
    it('login setData password', async () => {
        await wrapper.setData({ form: { password: 'admin' } });
        expect(wrapper.find('.password-field').element.value).toBe('admin');
    });
    it('submit form', async () => {
        const spy = jest.spyOn(wrapper.vm, 'submitForm');
        await User.login.mockResolvedValue('token');
        const result = await wrapper.vm.submitForm(wrapper.vm.form);
        expect(result).toEqual('token');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
