import { Meta } from '@storybook/react/types-6-0'

import { storybookTemplate } from '../helpers/StorybookTemplate'

import Caption from './Caption'

export default {
  title: 'atoms',
  component: Caption,
} as Meta

const template = storybookTemplate(Caption)

export const CaptionHeading = template({
  children: 'Hello from Talent Pool',
})
