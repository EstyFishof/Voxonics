import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import switchTheme from '@/components/switchTheme';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('switchTheme', () => {

    const store = new Vuex.Store({
        state: {
            theme: ''
        },
        mutations: {
            setTheme(state, value) {
                state.theme = value;
            }
        },
    });
    const wrapper = shallowMount(switchTheme, {localVue, store});

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('toggle theme', () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleTheme');
        const isSwitched = wrapper.vm.toggleTheme();
        expect(spy).toHaveBeenCalled();
        expect(isSwitched).toBeTruthy();
        spy.mockRestore();
    });
});

