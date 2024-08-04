import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Support from '@/views/Support/Manual.vue';
import json from '@/assets/supportText/text.js';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

const globalSearch = {
    key: 'manual',
    value: 'agent'
};

const $route = {
    path: '/support/manual',
    hash: '#manual'
};

describe('support', () => {
    // let getters, actions, store;

    const store = new Vuex.Store({
        state: {
            globalSearch: globalSearch,
            theme: 'dark'
        },
        actions: {
            setActiveLinkSupport({commit}, value) {},
            setGlobalSearch({commit}, value) {},
        },
        getters: {
            getGlobalSearch(state) {
                return state.globalSearch;
            },
            theme(state) {
                return state.theme;
            }
        }
    });

    const wrapper = shallowMount(Support, { localVue, router, store, mocks: {$route} });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('openItems toHaveBeenCalled', async () => {
        store.dispatch('setGlobalSearch', {key: 'manual', value: ''});
        await wrapper.setData({dataFAQ: JSON.parse(JSON.stringify(json.FAQ))});
        await wrapper.setData({dataManual: JSON.parse(JSON.stringify(json.Manual))});
        const spy = jest.spyOn(wrapper.vm, 'openItems');
        await wrapper.vm.openItems();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('wheelListener toHaveBeenCalled', async () => {
    //     router.push('/support/manual#manual')
    //     const spy = jest.spyOn(wrapper.vm, 'wheelListener');
    //     await wrapper.vm.wheelListener();
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })
    // it('computed watch', async () => {
    //     Support.watch.$route.call(wrapper.vm)
    // })
    it('mounted component', async () => {
        await Support.mounted.call(wrapper.vm);
    });
    it('mounted beforeDestroy', async () => {
        await Support.beforeDestroy.call(wrapper.vm);
    });
});
