import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { FormInput } from '.'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/FormInput',
  component: FormInput,
} as Meta

const template = storybookTemplate(FormInput)

export const Email = template({
  name: 'email',
  label: 'Enter Email',
  type: 'email',
  placeholder: 'Enter Email',
  values: {
    email: 'talentpool@redi.org',
  }
})

export const Text = template({
  name: 'email',
  label: 'Enter Email',
  type: 'text',
  placeholder: 'Enter text'
});

export const Password = template({
  name: 'email',
  label: 'Enter Password',
  type: 'password',
  placeholder: 'Enter password',
})