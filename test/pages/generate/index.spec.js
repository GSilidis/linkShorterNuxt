import Generate from '@/pages/generate/index';
import { shallowMount } from '@vue/test-utils';

describe('pages/generate', () => {
    test('Should render HTML', () => {
        const wrapper = shallowMount(Generate);

        expect(wrapper.vm).toBeTruthy();

        const container = wrapper.find('.generator-container');
        expect(container.html()).toBeTruthy();
    });

    test('Should correctly handle methods', async () => {
        const wrapper = shallowMount(Generate);

        expect(wrapper.find('.form-container').html()).toBeTruthy();
        expect(wrapper.find('.results-container').exists()).toBe(false);

        wrapper.vm.onGenerationFormSubmit({
            shortLink: 'stub',
            statisticsLink: 'stub',
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.form-container').exists()).toBe(false)
        expect(wrapper.find('.results-container').html()).toBeTruthy();

        wrapper.vm.onReset();

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.form-container').html()).toBeTruthy();
        expect(wrapper.find('.results-container').exists()).toBe(false);
    });
});
