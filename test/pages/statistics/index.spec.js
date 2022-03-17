import Statistics from '@/pages/statistics/_id.vue';
import { mount, shallowMount } from '@vue/test-utils';

const genericStub = { template: '<div><slot /></div>' };

const stubs = {
    'client-only': genericStub,
    'b-modal': genericStub,
}

describe('pages/statistics/index', () => {
    test('Should render HTML', () => {
        const wrapper = mount(Statistics, {
            stubs
        });

        expect(wrapper.vm).toBeTruthy();

        const h1 = wrapper.find('h1');
        expect(h1.text()).toBeTruthy();
    });

    test('Should not validate page without params', () => {
        const params = { };
        const validate = Statistics.validate({ params });
        expect(validate).toBe(false)
    });

    test('Should validate page when correct param is set', () => {
        const params = {
            id: 'qwerty'
        };
        const validate = Statistics.validate({ params });
        expect(validate).toBe(true);
    });

    test('Should get computed property', () => {
        const idMock = 'qwerty';
        const wrapper = shallowMount(Statistics, {
            mocks: {
                $nuxt: {
                    context: {
                        params: {
                            id: idMock
                        }
                    }
                }
            },
            stubs
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.vm.pageId).toEqual(idMock);
    });

    test('Should get computed property', () => {
        const idMock = 'qwerty';
        const wrapper = shallowMount(Statistics, {
            mocks: {
                $nuxt: {
                    context: {
                        params: {
                            id: idMock
                        }
                    }
                }
            },
            stubs
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.vm.pageId).toEqual(idMock);
    });
});
