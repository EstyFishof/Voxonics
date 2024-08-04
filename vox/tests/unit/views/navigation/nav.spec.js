import {shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Nav from '../../../../src/views/Navigation/Nav.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
localVue.use(Vuex);

describe('Nav', () => {
    const store = new Vuex.Store({
        state: {
            activeLink: '',
            globalSearch: '',
            role: 'agent',
            user: {}
        },
        actions: {
            setActiveLinkSupport({commit}, value) {},
        },
        getters: {
            getGlobalSearch(state) {
                return state.globalSearch;
            },
            getActiveLinkSupport(state) {
                return state.activeLink;
            },
            userInfo(state) {
                return state.user;
            },
            roleAgent(state) {
                return state.role;
            }
        }
    });
    const wrapper = shallowMount(Nav, { store, localVue, router, stubs: {Nav: true} });
    it('Is Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('toggle visible nav-link', () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleVisible');
        const isToggled = wrapper.vm.toggleVisible('mock-text');
        expect(spy).toHaveBeenCalled();
        expect(isToggled).toBe('mock-text');
        spy.mockRestore();
    });
    it('toggle visible all nav-link', () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleFull');
        const isToggled = wrapper.vm.toggleFull(true);
        expect(spy).toHaveBeenCalled();
        expect(isToggled).toBe(false);
        spy.mockRestore();
    });

  });


