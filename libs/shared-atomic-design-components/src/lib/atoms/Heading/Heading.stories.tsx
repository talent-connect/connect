import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import HeadingComponent from './Heading'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Heading',
  component: HeadingComponent,
} as Meta

const template = storybookTemplate(HeadingComponent)

export const Heading = template({
  children: 'Heading',
  size: 'large',
  tag: 'h1',
  border: 'topCenter',
  center: true,
  subtitle: true,
})
