import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import App from '../../src/App';


const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('App', () => {
    window.env = {
        BASE_URL: 'http://168.119.92.172/'
    };
    const wrapper = shallowMount(App, { localVue, router });

    it('should  Vue instance', function () {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});

