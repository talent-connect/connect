import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { TextInput } from '.'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/TextInput',
  component: TextInput,
} as Meta

const template = storybookTemplate(TextInput)

export const Email = template({
  name: 'email',
  label: 'Enter email',
  type: 'email',
  placeholder: 'Enter here the email',
  values: {
    email: 'talentpool@redi.org',
  }
})

export const Text = template({
  name: 'email',
  label: 'Enter text',
  type: 'text',
  placeholder: 'Enter here the text'
});

export const Password = template({
  name: 'email',
  label: 'Enter password',
  type: 'password',
  placeholder: 'Enter here the password',
})