import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { Placeholder } from '.'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Placeholder',
  component: Placeholder,
} as Meta

const template = storybookTemplate(Placeholder)

export const Default = template({
  children: 'Placeholder',
})
