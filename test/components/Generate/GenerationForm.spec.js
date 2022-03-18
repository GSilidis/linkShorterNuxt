import Form from '@/components/Generate/GenerationForm';
import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('components/Generate/GenerationForm', () => {
    test('Should mount correctly', () => {
        const wrapper = mount(Form, {
            localVue,
        });

        expect(wrapper.vm).toBeTruthy();
    });

    test('Should handle error correctly', async () => {
        const wrapper = mount(Form, {
            localVue,
            mocks: {
                $nuxt: {
                    context: {
                        $axios: {
                            $post: async () => {
                                throw new Error('Mock Error');
                            },
                        }
                    }
                }
            }
        });
        wrapper.setData({
            url: 'https://example.com',
            error: null,
            showErrorMessage: false,
            isLoading: false,
        });

        await wrapper.vm.onSubmit();
        expect(wrapper.vm.$data).toEqual({
            error: 'Error: Mock Error',
            isLoading: false,
            showErrorMessage: true,
            url: 'https://example.com'
        });
        expect(wrapper.find('.alert-dismissible').exists()).toBe(true);
    });

    test('Should handle success correctly', async () => {
        const shortLink = 'qwe';
        const statisticsLink = 'sqwe';

        const wrapper = mount(Form, {
            localVue,
            mocks: {
                $nuxt: {
                    context: {
                        $axios: {
                            $post: async () => {
                                return {
                                    short_link: shortLink,
                                    statistics_link: statisticsLink,
                                };
                            },
                        }
                    }
                }
            }
        });
        wrapper.setData({
            url: 'https://example.com',
            error: null,
            showErrorMessage: false,
            isLoading: false,
        });

        await wrapper.vm.onSubmit();
        expect(wrapper.emitted().generated[0]).toEqual([{
            shortLink,
            statisticsLink,
        }]);
    });

});
