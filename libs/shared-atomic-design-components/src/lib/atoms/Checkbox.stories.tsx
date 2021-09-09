import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import CheckboxComponent from './Checkbox'
import 'bulma/css/bulma.min.css'

export default {
  title: 'atoms/Checkbox',
  component: CheckboxComponent,
} as Meta

const template = storybookTemplate(CheckboxComponent)

export const Checkbox = template({
  name: 'Checkbox',
  value: 'ABC',
  disabled: false,
})
