import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import LoaderComponent from './Loader'

export default {
  title: 'Atoms/Loader',
  component: LoaderComponent,
} as Meta

const template = storybookTemplate(LoaderComponent)

export const Loader = template({
  loading: true,
})
