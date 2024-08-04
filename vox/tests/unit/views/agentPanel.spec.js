import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AgentPanel from '@/views/AgentPanel.vue';
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
    });

    const wrapper = shallowMount(AgentPanel, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('logout toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'logout');
        await wrapper.vm.logout();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('computedTime toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'computedTime');
        await wrapper.vm.computedTime();
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
    it('computed component', async () => {
        await AgentPanel.computed.elapsed.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await AgentPanel.mounted.call(wrapper.vm);
    });
    it('beforeDestroy component', async () => {
        await AgentPanel.beforeDestroy.call(wrapper.vm);
    });
});