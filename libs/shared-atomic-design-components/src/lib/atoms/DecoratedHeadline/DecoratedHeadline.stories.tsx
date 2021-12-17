import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import DecoratedHeadlineComponent from './DecoratedHeadline'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/DecoratedHeadline',
  component: DecoratedHeadlineComponent,
} as Meta

const template = storybookTemplate(DecoratedHeadlineComponent)

export const DecoratedHeadline = template({
  headline: 'Headline',
  title: 'Title',
})
