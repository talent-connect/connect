import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { FilterDropdown } from '.'

export default {
  title: 'Molecules/FilterDropdown',
  component: FilterDropdown,
} as Meta

const template = storybookTemplate(FilterDropdown)

export const Default = template({})
