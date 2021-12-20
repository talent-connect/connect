import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Editable } from '.'

export default {
  title: 'Molecules/Editable',
  component: Editable,
} as Meta

const template = storybookTemplate(Editable)

export const Default = template({})
