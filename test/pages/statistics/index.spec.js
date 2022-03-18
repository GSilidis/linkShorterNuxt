import Statistics from '@/pages/statistics/_id.vue';
import { mount, shallowMount } from '@vue/test-utils';

const genericStub = { template: '<div><slot /></div>' };

const stubs = {
    'client-only': genericStub,
    'b-modal': genericStub,
}

const data = function () {
    return {
        id: 1,
    }
}

const mocks = {
    $nuxt: {
        context: {
            params: {
                id: 'qwerty'
            }
        }
    }
}

describe('pages/statistics/index', () => {
    test('Should render HTML', () => {
        const wrapper = mount(Statistics, {
            stubs,
            data
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
            stubs,
            data
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.vm.pageId).toEqual(idMock);
    });

    test('Should get computed property', () => {
        const wrapper = shallowMount(Statistics, {
            mocks,
            stubs,
            data
        });
    });

    test('Should correctly handle unexistened link', async () => {
        const wrapper = shallowMount(Statistics, {
            mocks,
            stubs,
            data
        });

        const error = jest.fn();
        await wrapper.vm.$options.asyncData({
            params: { id: 404 },
            $axios: {
                get: jest.fn(async () => {
                    return { status: 404 }
                }),
            },
            error,
        });

        expect(error).toBeCalledTimes(1);
        expect(error).toBeCalledWith({
            statusCode: 404,
            message: 'Statistics ID 404 does not exists'

        });
    });

    test('Should correctly handle existing link', async () => {
        const shortLink = 'qwerty';
        const originalLink = 'https://example.com';
        const id = 123;

        const wrapper = shallowMount(Statistics, {
            mocks,
            stubs,
            data
        });

        const error = jest.fn();
        const asyncData = await wrapper.vm.$options.asyncData({
            params: { id: 1 },
            $axios: {
                get: jest.fn(async () => {
                    return {
                        status: 200,
                        data: {
                            short_link: shortLink,
                            original_link: originalLink,
                            id: id,
                        }
                    }
                }),
            },
            error,
        });

        expect(error).toBeCalledTimes(0);
        expect(asyncData).toEqual({
            shortLink: `http://localhost/${shortLink}`,
            originalLink,
            id: id
        })
    });
});
