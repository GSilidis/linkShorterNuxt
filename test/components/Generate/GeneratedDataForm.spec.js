import Form from '@/components/Generate/GeneratedDataForm';
import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const propsData = {
    shortLink: 'qwe',
    statisticsLink: 'sqwe',
}

describe('components/Generate/GeneratedDataForm', () => {
    test('Should mount correctly', () => {
        const wrapper = mount(Form, {
            propsData,
            localVue,
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.vm.shortURL).toEqual(`http://localhost/${propsData.shortLink}`);
        expect(wrapper.vm.statisticsURL).toEqual(`http://localhost/statistics/${propsData.statisticsLink}`);
    });

    test('Should emit event correctly', async () => {
        const wrapper = mount(Form, {
            propsData,
            localVue,
        });

        wrapper.vm.onResetClick();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().reset).toBeTruthy();
    });

    test('Should correctly set selection', async () => {
        const wrapper = mount(Form, {
            propsData,
            localVue,
        });

        const item = {
            value: '12345',
            setSelectionRange: jest.fn(),
        };
        wrapper.vm.onInputClick({target: item});
        await wrapper.vm.$nextTick();
        expect(item.setSelectionRange).toBeCalledWith(0, 5);
    });

});
