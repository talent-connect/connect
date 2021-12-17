import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import FormInputComponent from './FormInput'
import 'bulma/css/bulma.min.css'

enum inputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
}

export default {
  title: 'Atoms/FormInput',
  component: FormInputComponent,
} as Meta

const template = storybookTemplate(FormInputComponent)

export const FormInput = template({
  name: 'email',
  className: '',
  label: 'Enter Email',
  type: inputType.EMAIL,
  placeholder: 'Enter Email',
  values: {
    email: 'talentpool@redi.org',
  },
  handleChange: () => { return },
  handleBlur: () => { return },
  disabled: false,
  // setFieldValue: (name: string, value: string) => { // TODO: remove?
  //   return
  // },
  // setFieldTouched: (name: string, value: string) => { // TODO: remove?
  //   return
  // },
})
