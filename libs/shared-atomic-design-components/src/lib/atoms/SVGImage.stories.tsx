import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import SVGImageComponent, { SVGImages } from './SVGImage'

export default {
  title: 'atoms/image',
  component: SVGImageComponent,
} as Meta

const template = storybookTemplate(SVGImageComponent)

export const SVG = template({
  image: 'mentee',
  className: 'svg-image',
})
