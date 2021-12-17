import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'
import { EDUCATION_LEVELS } from '@talent-connect/shared-config'

import FormSelectComponent from './FormSelect'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/FormSelect',
  component: FormSelectComponent,
} as Meta

const template = storybookTemplate(FormSelectComponent)

export const FormSelect = template({
  name: 'language',
  className: '',
  label: 'Select School',
  placeholder: 'Select School',
  items: Object.keys(EDUCATION_LEVELS),
  values: ['language'],
  handleChange: () => { return },
  handleBlur: () => { return },
  disabled: false,
  setFieldValue: () => { return },
  setFieldTouched: () => { return },
})
