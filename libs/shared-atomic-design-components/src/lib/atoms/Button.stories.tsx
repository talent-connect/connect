import { Meta } from '@storybook/react/types-6-0'

import { storybookTemplate } from '../helpers/StorybookTemplate'

import Button from './Button'

export default {
  title: 'Button',
  component: Button,
} as Meta

const template = storybookTemplate(Button)

export const Primary = template({
  children: 'Click Me!',
})
