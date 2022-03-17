import Index from '@/pages/index';
import { mount, RouterLinkStub } from '@vue/test-utils';

describe('pages/index', () => {
    test('Should render HTML', () => {
        const wrapper = mount(Index, {
            stubs: {
                NuxtLink: RouterLinkStub,
            }
        });

        expect(wrapper.vm).toBeTruthy();

        const h1 = wrapper.find('h1');
        expect(h1.text()).toBeTruthy();
    });
});
