import { Meta } from '@storybook/react/types-6-0'
import { educationLevels } from '@talent-connect/shared-config'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import 'bulma/css/bulma.min.css'
import FormSelectComponent from './FormSelect'

export default {
  title: 'atoms/Formselect',
  component: FormSelectComponent,
} as Meta

const template = storybookTemplate(FormSelectComponent)

export const Formselect = template({
  name: 'language',
  className: '',
  label: 'Select School',
  placeholder: 'Select School',
  items: educationLevels,
  values: {
    language: '',
  },
  handleChange: () => {
    return
  },
  handleBlur: () => {
    return
  },
  disabled: false,
  setFieldValue: (name: string, value: string) => {
    return
  },
  setFieldTouched: (name: string, value: string) => {
    return
  },
})
