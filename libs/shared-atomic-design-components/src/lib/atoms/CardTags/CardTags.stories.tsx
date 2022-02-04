import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import CardTagsComponent from './CardTags'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/CardTags',
  component: CardTagsComponent,
} as Meta

const template = storybookTemplate(CardTagsComponent)

export const CardTags = template({
  items: ['HTML', 'CSS', 'JS', 'JAVA', 'Python'],
  shortList: false,
})
