import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Departments from '../../../src/views/Config/Departments/Departments.vue';
import Paginator from '../../../src/components/Paginator.vue';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('Departments', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const store = new Vuex.Store({
        state: {
            paginator: {peerPage: 10, page: 1, paginator: {count: 50, recordsPerPage: 5}},
            globalSearch: ''
        },
        actions: {
            setStrategy({commit}, value) {},
            setTimeout({commit}, value) {},
            setRinginuse({commit}, value) {},
            setWait({commit}, value) {},
        },
        mutations: {
            managersQueueInfoMutation(state, value) {
                state.listManagers = value;
            }
        },
        getters: {
            getGlobalSearch(state) {
                return state.globalSearch;
            },
            getPaginatorDepartment(state) {
                return state.paginator;
            }
        }
    });

    // const mock = jasmine.createSpy()
    const mock = jest.fn();

    const StubbedComponent = {
        render() {},
        paginator: {
            setDataPeerPage: () => jest.fn()
        }
    };
    const wrapper = shallowMount(Departments, { store, localVue, router, stubs: {Departments: true, paginator: Paginator}, mocks: {$refs: {paginator: {setDataPeerPage: () => jest.fn()}}} });
    // wrapper.vm.$refs.stubbedComponent.mock()



    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('onscroll toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'onscroll');
        await wrapper.vm.onscroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('deleteScroll toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteScroll');
        await wrapper.vm.deleteScroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('funScroll toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'funScroll');
        await wrapper.vm.funScroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('funScroll recordsPerPage < count', async () => {
        // await wrapper.setData({paginator: {recordsPerPage: 9, count: 12}})
        const spy = jest.spyOn(wrapper.vm, 'funScroll');
        await wrapper.vm.funScroll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('viewDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'viewDepartment');
        await wrapper.vm.viewDepartment({name: 'dep', uid: 5000});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('goToAddNewUserPage toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'goToAddNewUserPage');
        await wrapper.vm.goToAddNewUserPage();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('name');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('name');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('fetch toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'fetch');
        await wrapper.vm.fetch('url', 9, 'name', 9, 'name');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('created component', () => {
        Departments.created.call(wrapper.vm);
    });
    it('mounted component', async () => {
        // console.log({'1111' : wrapper.vm.$refs});0
        // wrapper.$refs
        // await store.commit('managersQueueInfoMutation', [{}, {}])
        await Departments.mounted.call(wrapper.vm);
    });
    it('beforeDestroy component', () => {
        // console.log({'1111' : wrapper.vm.$refs});
        Departments.beforeDestroy.call(wrapper.vm);
    });

});
