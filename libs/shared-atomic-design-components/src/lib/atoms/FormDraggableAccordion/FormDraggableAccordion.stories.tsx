import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { FormDraggableAccordion } from '.'
import 'bulma/css/bulma.min.css'
import 'react-datepicker/dist/react-datepicker.css'

export default {
  title: 'Atoms/FormDraggableAccordion',
  component: FormDraggableAccordion,
} as Meta

const template = storybookTemplate(FormDraggableAccordion)

export const Default = template({})
