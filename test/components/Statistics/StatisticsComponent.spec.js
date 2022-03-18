import Component from '@/components/Statistics/StatisticsComponent';
import { mount } from '@vue/test-utils';

const propsData = {
    linkId: 1
}

const stubs = {
    'b-spinner': { template: '<div><slot /></div>' },
}

describe('components/Statistics/StatisticsComponent', () => {
    test('Should mount correctly', () => {
        const wrapper = mount(Component, {
            propsData
        });

        expect(wrapper.vm).toBeTruthy();
    });

    test('Should get computed values correctly', async () => {
        const wrapper = mount(Component, {
            propsData
        });

        expect(wrapper.vm.timeRangeSelected).toBe(false);
        wrapper.vm.timeRange = [new Date(), new Date()];
        expect(wrapper.vm.timeRangeSelected).toBe(true);
    });

    test('Should correctly handle request errors', async () => {
        const wrapper = mount(Component, {
            propsData,
            stubs,
            mocks: {
                $nuxt: {
                    context: {
                        $axios: {
                            $get: async () => { throw new Error('Mock error') },
                        },
                    },
                },
            },
        });
        wrapper.vm.timeRange = [new Date(), new Date()];

        await wrapper.vm.onGetStatisticsClick();

        expect(wrapper.vm.error).toEqual('Error: Mock error');
        expect(wrapper.find('.alert-danger.rounded').text()).toEqual('Error: Mock error');
    });

    test('Should correctly handle successful request', async () => {
        const wrapper = mount(Component, {
            propsData,
            stubs,
            mocks: {
                $nuxt: {
                    context: {
                        $axios: {
                            $get: async () => {
                                return [{
                                    date: '2022-03-18',
                                    click_count: 1
                                },{
                                    date: '2022-03-17',
                                    click_count: 2
                                },]
                            },
                        },
                    },
                },
            },
        });
        wrapper.vm.timeRange = [new Date(), new Date()];

        await wrapper.vm.onGetStatisticsClick();

        expect(wrapper.vm.clickData.labels).toEqual(['2022-03-18', '2022-03-17']);
        expect(wrapper.vm.clickData.data).toEqual([1, 2]);
    });
});
