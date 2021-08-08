import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import CaptionComponent from './Caption'
import 'bulma/css/bulma.min.css'

export default {
  title: 'atoms/Caption',
  component: CaptionComponent,
} as Meta

const template = storybookTemplate(CaptionComponent)

export const Caption = template({
  children: 'Hello from Talent Pool',
})
