import { Meta } from '@storybook/react/types-6-0'

import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Button } from '.'

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta

const template = storybookTemplate(Button)

export const Primary = template({
  children: 'Click Me!',
  fullWidth: false,
  size: 'medium',
  disabled: false,
  separator: false,
  simple: false,
})
