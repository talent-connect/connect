import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Modal } from '.'

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as Meta

const template = storybookTemplate(Modal)

export const Default = template({})
