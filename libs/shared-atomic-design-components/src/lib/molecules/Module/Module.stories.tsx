import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Module } from '.'

export default {
  title: 'Molecules/Module',
  component: Module,
} as Meta

const template = storybookTemplate(Module)

export const Default = template({})
