import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'
import { educationLevels } from '@talent-connect/shared-config'

import FormSelectComponent from './FormSelect'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/Formselect',
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
