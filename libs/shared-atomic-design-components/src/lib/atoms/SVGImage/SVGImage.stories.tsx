import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../../helpers/StorybookTemplate'

import { SVGImage } from '.'

export default {
  title: 'Atoms/SVGImage',
  component: SVGImage,
} as Meta

const template = storybookTemplate(SVGImage)

export const Default = template({
  image: 'mentee',
  className: 'svg-image',
})
