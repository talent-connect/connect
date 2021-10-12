import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'
import { educationLevels } from '@talent-connect/shared-config'

import FormInputComponent from './FormInput'
import 'bulma/css/bulma.min.css'

enum inputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
}

export default {
  title: 'atoms/Forminput',
  component: FormInputComponent,
} as Meta

const template = storybookTemplate(FormInputComponent)

export const Forminput = template({
  name: 'email',
  className: '',
  label: 'Enter Email',
  type: inputType.EMAIL,
  placeholder: 'Enter Email',
  values: {
    email: 'talentpool@redi.org',
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
