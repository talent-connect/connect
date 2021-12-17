import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Heading } from '.'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Heading',
  component: Heading,
} as Meta

const template = storybookTemplate(Heading)

export const Default = template({
  children: 'Heading',
  size: 'large',
  tag: 'h1',
  border: 'topCenter',
  center: true,
  subtitle: true,
})
