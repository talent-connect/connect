import { Meta } from '@storybook/react/types-6-0'

import { storybookTemplate } from '../helpers/StorybookTemplate'

import ButtonComponent from './Button'

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
} as Meta

const template = storybookTemplate(ButtonComponent)

export const Primary = template({
  children: 'Click Me!',
  fullWidth: false,
  size: 'medium',
  disabled: false,
  separator: false,
  simple: false,
})
