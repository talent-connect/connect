import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { SearchField } from '.'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/SearchField',
  component: SearchField,
} as Meta

const template = storybookTemplate(SearchField)

export const Default = template({
  defaultValue: 'Talent Pool',
  placeholder: 'Search',
  valueChange: (value: string) => {
    return
  },
})
