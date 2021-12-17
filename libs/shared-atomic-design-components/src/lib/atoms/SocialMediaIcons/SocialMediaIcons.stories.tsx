import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import SocialMediaIconsComponent from './SocialMediaIcons'

export default {
  title: 'Atoms/Socialmediaicons',
  component: SocialMediaIconsComponent,
} as Meta

const template = storybookTemplate(SocialMediaIconsComponent)

export const Socialmediaicons = template({})
