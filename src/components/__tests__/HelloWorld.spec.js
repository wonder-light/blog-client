import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import SakuraEffect from '../common/SakuraEffect.vue';

describe('SakuraEffect', () => {
    it('renders properly', () => {
        const wrapper = mount(SakuraEffect, {props: {msg: 'Editor Vitest'}});
        expect(wrapper.text()).toContain('Editor Vitest');
    });
});
