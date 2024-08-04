import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Numbers from '../../../src/views/Config/Numbers/Numbers.vue';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();
localVue.use(Vuex);

describe('Numbers', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    // beforeEach(() => {
    //     wrapper.setData({numbers: [{usedIn: {department: [{uid: '123', name: 'default'}]}}]})
    // })

    const store = new Vuex.Store({
        state: {
            dep: {relatedWith: {externalNumberUid: [], userUid: []}, belongTo: []},
            paginator: {paginator: {peerPage: 10, page: 1, recordsPerPage: 12}},
        },
        getters: {
            getInitialAvaibleNumbers(state) {
                return state.dep;
            },
            getPaginatorNumbers(state) {
                return state.paginator;
            }
        }
    });
    const wrapper = shallowMount(Numbers, { store, localVue, router, stubs: {Numbers: true} });
    wrapper.setData({numbers: [{usedIn: {department: [{uid: '123', name: 'default'}]}}]});

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('setRefers toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setRefers');
        await wrapper.vm.setRefers(1111);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('setRefers toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setRefers');
        wrapper.setData({showRefers: 1111});
        await wrapper.vm.setRefers(1111);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('hide toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'hide');
        await wrapper.vm.hide();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mark toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'mark');
        await wrapper.vm.mark(1111);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mark toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'mark');
        wrapper.setData({clickedNumbers: [1111]});
        await wrapper.vm.mark(1111);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('markAll toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'markAll');
        wrapper.setData({numbers: [{uid: 1111}]});
        await wrapper.vm.markAll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('searchUsers toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'searchUsers');
        await wrapper.vm.searchUsers('number');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('searchUsers toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'searchUsers');
        await wrapper.vm.searchUsers('name');
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
        await wrapper.vm.fetch("external-numbers?", 9, 'name', 9);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toDepartment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'toDepartment');
        await wrapper.vm.toDepartment({uid: 1111});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mounted component', async () => {
        await wrapper.setData({numbers: [{usedIn: {department: [{uid: '123', name: 'default'}]}}]});
        await Numbers.mounted.call(wrapper.vm);
    });
    it('created component', async () => {
        await wrapper.setData({numbers: [{usedIn: {department: [{uid: '123', name: 'default'}]}}]});
        await Numbers.created.call(wrapper.vm);
    });
       
});