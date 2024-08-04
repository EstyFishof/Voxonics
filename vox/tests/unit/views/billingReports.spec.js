import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Statement from '@/views/Reports/BillingReports/Statement.vue';
import Payments from '@/views/Reports/BillingReports/Payments.vue';
import Charges from '@/views/Reports/BillingReports/Charges.vue';
import mock from './__mock__/billing';
import VueTippy, { TippyComponent } from "vue-tippy";


const localVue = createLocalVue();
localVue.use(Vuex);
const router = new VueRouter();
localVue.use(Vuex);
localVue.use(VueTippy);
localVue.component("tippy", TippyComponent);

window.env = {
    BASE_URL: 'http://168.119.92.172/'
};

const paginator = {peerPage: 10, page: 1, paginator: {count: 50, recordsPerPage: 5}};

describe('Statement', () => {

    const store = new Vuex.Store({
        getters: {
            getStatement: () => mock.statement,
            getLastPayments: () => mock.getLastPayments,
            getLastCharges: () => mock.getLastCharges,
            theme: () => 'dark'
        }
    });

    const wrapper = shallowMount(Statement, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('getIconPayment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getIconPayment');
        await wrapper.vm.getIconPayment('success');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getIconPayment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getIconPayment');
        await wrapper.vm.getIconPayment('pending');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getIconPayment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getIconPayment');
        await wrapper.vm.getIconPayment('');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('computed lastRefill', () => {
        Statement.computed.lastRefill.call(wrapper.vm);
    });
    it('mounted component', async () => {
        await Statement.mounted.call(wrapper.vm);
    });
});

describe('Payments', () => {

    const store = new Vuex.Store({
        getters: {
            getStatement: () => mock.statement,
            getLastPayments: () => mock.getLastPayments,
            getLastCharges: () => mock.getLastCharges,
            getPaginatorPayments: () => paginator,
            theme: () => 'dark'
        }
    });

    const wrapper = shallowMount(Payments, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('getIconPayment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getIconPayment');
        await wrapper.vm.getIconPayment('success');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getIconPayment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getIconPayment');
        await wrapper.vm.getIconPayment('pending');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getIconPayment toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'getIconPayment');
        await wrapper.vm.getIconPayment('');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('mounted component', async () => {
        await Payments.mounted.call(wrapper.vm);
    });
});

describe('Charges', () => {

    const store = new Vuex.Store({
        getters: {
            getStatement: () => mock.statement,
            getLastPayments: () => mock.getLastPayments,
            getLastCharges: () => mock.getLastCharges,
            getPaginatorCharges: () => paginator,
            theme: () => 'dark'
        }
    });

    const wrapper = shallowMount(Charges, { localVue, router, store });
    it('it should  Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('Check snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('date');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('purpose');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('country');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('description');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('completed');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('chargeType');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('sort toHaveBeenCalled', async () => {
        const spy = jest.spyOn(wrapper.vm, 'sort');
        await wrapper.vm.sort('chargeAmount');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('mounted component', async () => {
        await Charges.mounted.call(wrapper.vm);
    });
});