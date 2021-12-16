import { ComponentMeta } from '@storybook/react';
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Checkbox } from '.'

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    handleChange: {
      control: { type: 'object' }
    },
    handleBlur: {
      control: { type: 'object' }
    }
  }
} as ComponentMeta<typeof Checkbox>

const template = storybookTemplate(Checkbox)

export const Default = template({
  name: 'Checkbox',
  value: 'ABC',
});

export const Labeled = template({
  name: 'Checkbox',
  value: 'ABC',
}, <span>Label</span>)