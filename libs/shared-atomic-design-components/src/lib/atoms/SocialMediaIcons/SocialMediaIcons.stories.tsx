import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { SocialMediaIcons } from '.'

export default {
  title: 'Atoms/SocialMediaIcons',
  component: SocialMediaIcons,
} as Meta

const template = storybookTemplate(SocialMediaIcons)

export const Default = template({})
