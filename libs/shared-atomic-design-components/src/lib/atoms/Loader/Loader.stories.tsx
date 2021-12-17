import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Loader } from '.'

export default {
  title: 'Atoms/Loader',
  component: Loader,
} as Meta

const template = storybookTemplate(Loader)

export const Default = template({
  loading: true,
})
