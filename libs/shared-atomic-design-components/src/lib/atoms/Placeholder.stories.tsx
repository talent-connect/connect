import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import PlaceholderComponent from './Placeholder'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Placeholder',
  component: PlaceholderComponent,
} as Meta

const template = storybookTemplate(PlaceholderComponent)

export const Placeholder = template({
  children: 'Placeholder',
})
