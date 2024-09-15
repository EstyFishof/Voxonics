import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import NumbersOfDepartments from "@/views/Config/Numbers/NumbersOfDepartments";
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();


const mockDepartment = {
    uid: "71b966fb-c930-481e-aa3a-3a942a6d3e59",
    name: "Manage",
    option: {
        edit: 1
    }
};
const paginator = {
    peerPage: 10, 
    page: 1, 
    paginator: {
        count: 50, 
        recordsPerPage: 5
    },
};

describe('edit user', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    let getters;
    let store;
    let actions;
    let mutations;

    beforeEach(() => {
        actions = {
            addNumbers: jest.fn(),
            removeNumber: jest.fn(),
        };
        getters = {
            departmentsForNum: () => [],
            uidForWrite: () => '',
            numbersForView: () => [],
            getPaginatorDepForNums: () => paginator,
        };
        mutations = {
            getNumbersForView: jest.fn()
        };
        store = new Vuex.Store({
            getters, actions, mutations
        });
    });
    it('should  Vue instance', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        expect(wrapper.vm).toBeTruthy();
    });
    // it('Check snapshot', () => {
    //     const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store });
    //     expect(wrapper.element).toMatchSnapshot();
    // })
    it('vuex defined', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        expect(wrapper.vm.departmentsForNum).toBeDefined();
        expect(wrapper.vm.uidForWrite).toBeDefined();
        expect(wrapper.vm.numbersForView).toBeDefined();
    });

    it('searchDepartment', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'searchDepartment');
        wrapper.vm.searchDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('refreshNumbers', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'refreshNumbers');
        wrapper.vm.refreshNumbers();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('showNumbersList', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'showNumbersList');
        wrapper.vm.showNumbersList('e', mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('showNumbersList', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        wrapper.setData({showNumberList : mockDepartment.uid});
        const spy = jest.spyOn(wrapper.vm, 'showNumbersList');
        wrapper.vm.showNumbersList('e', mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('showNumbers', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'showNumbers');
        wrapper.vm.showNumbers({target: {className: 'selected'}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('hideDeps', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        wrapper.setData({showNumberList: '1'});
        const spy = jest.spyOn(wrapper.vm, 'hideDeps');
        wrapper.vm.hideDeps();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mark departments', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'mark');
        wrapper.vm.mark('one',[]);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mark all departments', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'markAll');
        wrapper.setData({clickedDepartments: ['1']});
        wrapper.vm.markAll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'sort');
        wrapper.vm.sort('country', {relatedWith: {externalNumber: [{country: '', network: '', number: ''}]}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('searchDepartment', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'searchDepartment');
        wrapper.vm.searchDepartment();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('addNumber', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'addNumber');
        wrapper.vm.addNumber(mockDepartment, {select: 123});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('addClickedNumbers', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'addClickedNumbers');
        wrapper.vm.addClickedNumbers(mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('removeNumber', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'removeNumber');
        wrapper.vm.removeNumber(mockDepartment, {uid: 1213});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('removeClickedNumbers', () => {
        const wrapper = shallowMount(NumbersOfDepartments, { localVue, router, store, stubs: {NumbersOfDepartments: true} });
        const spy = jest.spyOn(wrapper.vm, 'removeClickedNumbers');
        wrapper.vm.removeClickedNumbers(mockDepartment);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});
