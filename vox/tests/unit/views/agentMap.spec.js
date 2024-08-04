import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AgentsMap from '@/views/Dashboard/AgentsMap.vue';
import VueTippy, { TippyComponent } from "vue-tippy";

const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

describe('support', () => {
    window.env = {
        WS_URL: 'ws://168.119.92.172:9595'
    };
    const store = new Vuex.Store({
        actions: {
            pushLogout({commit}, value) {},
            emitError({commit}, value) {},
        },
        getters: {
            userInfo: () => {}
        }
    });

    const wrapper = shallowMount(AgentsMap, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('getTime toHaveBeenCalled', async () => {
        await wrapper.setData({data: [{time: 0}]});
        const spy = jest.spyOn(wrapper.vm, 'getTime');
        await wrapper.vm.getTime();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('computedTime toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'computedTime');
        await wrapper.vm.computedTime(0);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('switchViews toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'switchViews');
        await wrapper.vm.switchViews();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.isList).toStrictEqual(true);
        spy.mockRestore();
    });
    it('hideListOptions toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'hideListOptions');
        await wrapper.vm.hideListOptions();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.isShowMenu).toStrictEqual('');
        expect(wrapper.vm.sortByShow).toStrictEqual(false);
        spy.mockRestore();
    });
    it('hideListOptions toHaveBeenCalled', async () => {
        await wrapper.setData({indexAgent: 'true'});
        const spy = jest.spyOn(wrapper.vm, 'hideListOptions');
        await wrapper.vm.hideListOptions();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        await wrapper.setData({data: [{name: 'AAA'}]});
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('editMap toHaveBeenCalled', async () => {
        await wrapper.setData({data: [{name: 'AAA'}]});
        const spy = jest.spyOn(wrapper.vm, 'editMap');
        await wrapper.vm.editMap();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.initialData).toStrictEqual([{name: 'AAA'}]);
        spy.mockRestore();
    });
    it('addCard toHaveBeenCalled', async () => {
        await wrapper.setData({data: [{name: 'AAA'}]});
        const spy = jest.spyOn(wrapper.vm, 'addCard');
        await wrapper.vm.addCard();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('toBackMap toHaveBeenCalled', async () => {
        await wrapper.setData({initialData: [{name: 'AAA'}]});
        const spy = jest.spyOn(wrapper.vm, 'toBackMap');
        await wrapper.vm.toBackMap();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.data).toStrictEqual([{name: 'AAA'}]);
        spy.mockRestore();
    });
    it('deleteCard toHaveBeenCalled', async () => {
        await wrapper.setData({data: [{name: 'AAA', id: 111}]});
        const spy = jest.spyOn(wrapper.vm, 'deleteCard');
        await wrapper.vm.deleteCard({name: 'AAA', id: 111});
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.data).toStrictEqual([]);
        spy.mockRestore();
    });
    it('setPause toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'setPause');
        await wrapper.vm.setPause({name: 'AAA', id: 111, onPause: true});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('logOutUser toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'logOutUser');
        await wrapper.vm.logOutUser({name: 'AAA', id: 111, onShift: true});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('updateMap toHaveBeenCalled', async () => {
        await wrapper.setData({data: [{name: 'AAA', id: 111}]});
        const spy = jest.spyOn(wrapper.vm, 'updateMap');
        await wrapper.setData({data: [{name: 'AAA', id: 111, onShift: true}]});
        await wrapper.setData({initialData: [{name: 'AAA', id: 111, onShift: true}]});
        await wrapper.vm.updateMap();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.initialData).toStrictEqual([]);
        spy.mockRestore();
    });
    it('showMenu toHaveBeenCalled', async () => {
        await wrapper.setData({isShowMenu: 111});
        const spy = jest.spyOn(wrapper.vm, 'showMenu');
        await wrapper.vm.showMenu({uid: 111});
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.isShowMenu).toStrictEqual('');
        spy.mockRestore();
    });
    it('showMenu toHaveBeenCalled', async () => {
        await wrapper.setData({isShowMenu: 111});
        const spy = jest.spyOn(wrapper.vm, 'showMenu');
        await wrapper.vm.showMenu({uid: 123});
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.isShowMenu).toStrictEqual(123);
        spy.mockRestore();
    });
    it('insert1 toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'insert1');
        await wrapper.vm.insert1({index: 1, data: {}});
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('remove toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'remove');
        await wrapper.vm.remove(['aaa', 'bbb'], 'aaa');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("online");
        expect(spy).toHaveReturnedWith({ color: '#00C82C', icon: wrapper.vm.OnlineIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("paused");
        expect(spy).toHaveReturnedWith({ color: '#FFB200', icon: wrapper.vm.PauseIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("offline");
        expect(spy).toHaveReturnedWith({ color: '#FF3A29', icon: wrapper.vm.OfflineIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("calling");
        expect(spy).toHaveReturnedWith({ color: '#78ABCE', icon: wrapper.vm.CallingIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("ringing");
        expect(spy).toHaveReturnedWith({ color: '#78ABCE', icon: wrapper.vm.CallingIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("talking");
        expect(spy).toHaveReturnedWith({ color: '#276899', icon: wrapper.vm.TalkingIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor("blocked");
        expect(spy).toHaveReturnedWith({ color: '#636D75', icon: wrapper.vm.UnreachableIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor('');
        expect(spy).toHaveReturnedWith({ color: '#636D75', icon: wrapper.vm.UnreachableIcon });
        spy.mockRestore();
    });
    it('changeColor toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'changeColor');
        await wrapper.vm.changeColor('talking&calling');
        expect(spy).toHaveReturnedWith({ color: '#78ABCE', icon: wrapper.vm.CallingIcon });
        spy.mockRestore();
    });
    it('mounted component', async () => {
        await AgentsMap.mounted.call(wrapper.vm);
    });
    it('beforeDestroy component', async () => {
        await AgentsMap.beforeDestroy.call(wrapper.vm);
    });
});