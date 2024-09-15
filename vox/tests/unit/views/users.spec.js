import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Users from '../../../src/views/Config/Users/Users.vue';
import Vuex from 'vuex';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);
const router = new VueRouter();

describe('Users', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };

    const store = new Vuex.Store({
        state: {
            paginator: {peerPage: 10, page: 1, paginator: {count: 50, recordsPerPage: 5}},
            globalRearch: '',
            theme: 'dark'
        },
        getters: {
            getPaginatorUsers(state) {
                return state.paginator;
            },
            getGlobalSearch(state) {
                return state.globalRearch;
            },
            theme(state) {
                return state.theme;
            }
        }
    });

    const wrapper = shallowMount(Users, { localVue, store, router, stubs: {Users: true} });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('sort typeof', () => {
        expect(typeof wrapper.vm.sortBy).toBe('string');
    });
    it('users typeof', () => {
        expect(typeof wrapper.vm.users).toBe('object');
    });
    it('load typeof', () => {
        expect(typeof wrapper.vm.load).toBe('boolean');
    });
    it('scroll typeof', () => {
        expect(typeof wrapper.vm.scroll).toBe('object');
    });
    it('filter typeof', () => {
        expect(typeof wrapper.vm.filter).toBe('object');
    });
    it('clickedUsers typeof', () => {
        expect(typeof wrapper.vm.clickedUsers).toBe('object');
    });
    // it('first user computed', () => {
    //     expect(wrapper.vm.firstUser).toBeGreaterThanOrEqual(1)
    // })
    // it('last user computed', () => {
    //     expect(wrapper.vm.lastUser).toBeGreaterThanOrEqual(1)
    // })
    it('mark user', () => {
        const spy = jest.spyOn(wrapper.vm, 'mark');
        const isMarked = wrapper.vm.mark('one',[]);
        expect(spy).toHaveBeenCalled();
        expect(isMarked.length).toBe(1);
        spy.mockRestore();
    });
    it('mark user includes', () => {
        const spy = jest.spyOn(wrapper.vm, 'mark');
        const isMarked = wrapper.vm.mark('one',['one']);
        expect(spy).toHaveBeenCalled();
        expect(isMarked.length).toBe(1);
        spy.mockRestore();
    });
    it('mark all user - clear', () => {
        const spy = jest.spyOn(wrapper.vm, 'markAll');
        wrapper.vm.markAll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mark all user', () => {
        const spy = jest.spyOn(wrapper.vm, 'markAll');
        wrapper.setData({clickedUsers: ['1']});
        wrapper.vm.markAll();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    // it('leaf through back', () => {
    //     const spy = jest.spyOn(wrapper.vm, 'leafThrough');
    //     const isThroughBack = wrapper.vm.leafThrough('back');
    //     expect(spy).toHaveBeenCalled();
    //     expect(isThroughBack).toBeGreaterThanOrEqual(0);
    //     spy.mockRestore();
    // })
    // it('leaf through forward', () => {
    //     const spy = jest.spyOn(wrapper.vm, 'leafThrough');
    //     const isThroughForward = wrapper.vm.leafThrough('fw');
    //     expect(spy).toHaveBeenCalled();
    //     expect(isThroughForward).toBeGreaterThanOrEqual(0);
    //     spy.mockRestore();
    // })
    it('search by name', () => {
        const spy = jest.spyOn(wrapper.vm, 'searchUsers');
        const isSearch = wrapper.vm.searchUsers('name');
        expect(spy).toHaveBeenCalled();
        // expect(isSearch).toBe('name');
        spy.mockRestore();
    });
    it('sort by ...', () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        const isSort = wrapper.vm.sort('str');
        expect(spy).toHaveBeenCalled();
        expect(isSort).toBeTruthy();
        spy.mockRestore();
    });
    it('set length strings', () => {
        const spy = jest.spyOn(wrapper.vm, 'setDataToDisplay');
        wrapper.vm.setDataToDisplay([{name:'',email:'',position:''}]);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('view user false', () => {
        const spy = jest.spyOn(wrapper.vm, 'viewUser');
        const result = wrapper.vm.viewUser({target: {className:'action'}}, {uid:''});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('view user true', () => {
        const spy = jest.spyOn(wrapper.vm, 'viewUser');
        const result = wrapper.vm.viewUser({target: {className:'123'}}, {uid:'456123'});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

});
