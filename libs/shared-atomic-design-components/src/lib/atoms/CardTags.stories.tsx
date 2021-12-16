import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import CardTagsComponent from './CardTags'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Cardtag',
  component: CardTagsComponent,
} as Meta

const template = storybookTemplate(CardTagsComponent)

export const Cardtag = template({
  items: ['HTML', 'CSS', 'JS', 'JAVA', 'Python'],
  shortList: false,
})
