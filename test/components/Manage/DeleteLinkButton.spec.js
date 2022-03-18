import Button from '@/components/Manage/DeleteLinkButton';
import { mount } from '@vue/test-utils';

const propsData = {
    linkId: 123,
}

const genericStub = { template: '<div><slot /></div>' };
const stubs = {
    'b-modal': genericStub,
    'b-progress': genericStub,
    'b-button': genericStub,
}

describe('components/Manage/DeleteLinkButton', () => {
    test('Should mount correctly', () => {
        const wrapper = mount(Button, {
            propsData,
            stubs,
        });

        expect(wrapper.vm).toBeTruthy();
    });

    test('Should cancel deletion if modal returned false', async () => {
        const wrapper = mount(Button, {
            propsData,
            stubs,
            mocks: {
                $bvModal: {
                    msgBoxConfirm: async () => false,
                }
            }
        });

        await wrapper.vm.onDeleteClick();

        expect(wrapper.vm.$data).toEqual({
            isDeleting: false,
            isDeleted: false,
            error: null,
        });
    });

    test('Should correctly handle deletion error', async () => {
        const wrapper = mount(Button, {
            propsData,
            stubs,
            mocks: {
                $bvModal: {
                    msgBoxConfirm: async () => true,
                },
                $nuxt: {
                    context: {
                        $axios: {
                            $delete: async () => { throw new Error('Mock error')}
                        }
                    }
                }
            }
        });

        await wrapper.vm.onDeleteClick();

        expect(wrapper.vm.$data).toEqual({
            isDeleting: true,
            isDeleted: false,
            error: 'Error: Mock error',
        });
        expect(wrapper.find('.d-block.text-center').find('p').text()).toEqual('Error: Mock error');
    });

    test('Should correctly handle successful deletion', async () => {
        const wrapper = mount(Button, {
            propsData,
            stubs,
            mocks: {
                $bvModal: {
                    msgBoxConfirm: async () => true,
                },
                $nuxt: {
                    context: {
                        $axios: {
                            $delete: async () => true,
                        },
                    },
                },
            }
        });

        await wrapper.vm.onDeleteClick();

        expect(wrapper.vm.$data).toEqual({
            isDeleting: false,
            isDeleted: true,
            error: null,
        });
        expect(wrapper.find('.d-block.text-center').find('h3').text()).toEqual('Deleted successfully');
    });

    test('Should correctly handle modal close events', async () => {
        const wrapper = mount(Button, {
            propsData,
            stubs,
        });

        wrapper.setData({
            isDeleting: true,
            isDeleted: true,
            error: 'asd',
        });

        const backdropEvent = {
            trigger: 'backdrop',
            preventDefault: jest.fn(),
        };
        const closeEvent = {};

        wrapper.vm.handleModalClose(backdropEvent);
        expect(backdropEvent.preventDefault).toBeCalledTimes(1);

        wrapper.vm.handleModalClose(closeEvent);
        expect(wrapper.vm.$data).toEqual({
            isDeleting: false,
            isDeleted: false,
            error: null,
        });
    });

    test('Should redirect on completion', async () => {
        const replaceMock = jest.fn();
        const wrapper = mount(Button, {
            propsData,
            stubs,
            mocks: {
                $router: {
                    replace: replaceMock,
                },
            },
        });

        wrapper.vm.handleSuccessfulLinkRemoval();
        expect(replaceMock).toBeCalledTimes(1);
        expect(replaceMock).toBeCalledWith('/');
    });
});
