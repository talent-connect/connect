import { ComponentMeta } from '@storybook/react';
import { storybookTemplate } from '../helpers/StorybookTemplate'

import CheckboxComponent from './Checkbox'

export default {
  title: 'atoms/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    handleChange: {
      control: { type: 'object' }
    },
    handleBlur: {
      control: { type: 'object' }
    }
  }
} as ComponentMeta<typeof CheckboxComponent>

const template = storybookTemplate(CheckboxComponent)

export const Checkbox = template({
  name: 'Checkbox',
  value: 'ABC',
})