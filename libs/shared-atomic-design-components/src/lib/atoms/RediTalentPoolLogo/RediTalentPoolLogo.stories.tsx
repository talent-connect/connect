import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { RediTalentPoolLogo } from '.'

export default {
  title: 'Atoms/RediTalentPoolLogo',
  component: RediTalentPoolLogo,
} as Meta

const template = storybookTemplate(RediTalentPoolLogo)

export const Default = template({})
