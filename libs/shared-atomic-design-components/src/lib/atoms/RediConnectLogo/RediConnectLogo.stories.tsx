import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { RediConnectLogo } from '.'

export default {
  title: 'Atoms/RediConnectLogo',
  component: RediConnectLogo,
} as Meta

const template = storybookTemplate(RediConnectLogo)

export const Default = template({})
