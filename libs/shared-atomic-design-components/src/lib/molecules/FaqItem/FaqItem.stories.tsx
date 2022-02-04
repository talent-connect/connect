import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { FaqItem } from '.'

export default {
  title: 'Molecules/FaqItem',
  component: FaqItem,
} as Meta

const template = storybookTemplate(FaqItem)

export const Default = template({})
