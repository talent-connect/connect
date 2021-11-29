import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import SearchFieldComponent from './SearchField'
import 'bulma/css/bulma.min.css'

export default {
  title: 'atoms/Searchfield',
  component: SearchFieldComponent,
} as Meta

const template = storybookTemplate(SearchFieldComponent)

export const Searchfield = template({
  defaultValue: 'Talent Pool',
  placeholder: 'Search',
  valueChange: (value: string) => {
    return
  },
})
