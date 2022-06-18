import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import Editor from '../Editor.vue';

describe('Editor', () => {
    it('renders properly', () => {
        const wrapper = mount(Editor, {props: {msg: 'Editor Vitest'}});
        expect(wrapper.text()).toContain('Editor Vitest');
    });
});
