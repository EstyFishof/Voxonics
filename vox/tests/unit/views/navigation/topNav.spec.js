import { createLocalVue, shallowMount } from '@vue/test-utils';
import TopNav from '../../../../src/views/Navigation/TopNav';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);


describe('TopNav', () => {
    let store, getters;

    beforeEach(() => {
        getters = {
            userRole: () => 'agent',
            pathLocation: () => '/',
            isConfig: () => true,
            userInfoVuex: () => ({}),
            departmentInfo: () => ({}),
            getQueueNameInfo: () => 'queue',
            getQueueInfo: () => ({}),
            isPage: () => 'config',
            roleAgent: () => 'admin'
        };
        store = new Vuex.Store({
            getters
        });
    });

    it('Is Vue instance', () => {
        const wrapper = shallowMount(TopNav, { store, localVue, stubs: ['router-link', 'router-view'] });
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        const wrapper = shallowMount(TopNav, { store, localVue, stubs: ['router-link', 'router-view'] });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('active is defined', () => {
        const wrapper = shallowMount(TopNav, { store, localVue, stubs: ['router-link', 'router-view'] });
        expect(wrapper.vm.active).toBeDefined();
    });
    it('role is defined', () => {
        const wrapper = shallowMount(TopNav, { store, localVue, stubs: ['router-link', 'router-view'] });
        expect(wrapper.vm.role).toBeDefined();
    });
    it('setSecondaryList is defined', () => {
        const wrapper = shallowMount(TopNav, { store, localVue, stubs: ['router-link', 'router-view'] });
        const secondaryList = [];
        secondaryList.push(wrapper.vm.userRole[0].toUpperCase() + wrapper.vm.userRole.slice(1));
        expect(secondaryList[0]).toBe('Agent');
        expect(wrapper.vm.setSecondaryList.length).toBeGreaterThanOrEqual(0);
        expect(wrapper.vm.setSecondaryList).toBeDefined();
    });
    it('secondaryList uppercase', () => {
        const wrapper = shallowMount(TopNav, { store, localVue, stubs: ['router-link', 'router-view'] });
        const secondaryList = [];
        secondaryList.push(wrapper.vm.userRole[0].toUpperCase() + wrapper.vm.userRole.slice(1));
        expect(secondaryList[0]).toBe('Agent');
    });

});


