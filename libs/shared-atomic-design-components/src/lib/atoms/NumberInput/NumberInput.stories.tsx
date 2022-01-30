import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { NumberInput } from '.'
import 'bulma/css/bulma.min.css'

export default {
  title: 'Atoms/NumberInput',
  component: NumberInput,
} as Meta

const template = storybookTemplate(NumberInput)

export const Email = template({
  name: 'email',
  label: 'Enter email',
  placeholder: 'Enter here the email',
  values: {
    email: 'talentpool@redi.org',
  }
})