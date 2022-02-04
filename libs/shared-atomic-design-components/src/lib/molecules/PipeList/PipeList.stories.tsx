import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { PipeList } from '.'

export default {
  title: 'Molecules/PipeList',
  component: PipeList,
} as Meta

const template = storybookTemplate(PipeList)

export const Default = template({})
