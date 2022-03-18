import Chart from '@/components/Statistics/ClickChart';
import { mount } from '@vue/test-utils';

describe('components/Statistics/ClickChart', () => {
    test('Should mount correctly', () => {
        const wrapper = mount(Chart, {
            propsData: {
                labels: ['1', '2', '3'],
                data: [1, 2, 3]
            },
        });

        expect(wrapper.vm).toBeTruthy();
    });
});
