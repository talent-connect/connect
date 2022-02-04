import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Icon } from '.'

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as Meta

const template = storybookTemplate(Icon)

export const Default = template({})
