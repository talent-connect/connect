import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import DecoratedHeadlineComponent from './DecoratedHeadline'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Decoratedheadline',
  component: DecoratedHeadlineComponent,
} as Meta

const template = storybookTemplate(DecoratedHeadlineComponent)

export const Decoratedheadline = template({
  headline: 'Headline',
  title: 'Title',
})
