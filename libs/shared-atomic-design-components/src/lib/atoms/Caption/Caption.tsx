import { FC } from 'react'
import { Heading as BulmaHeading } from 'react-bulma-components'
import { CaptionProps } from './Caption.props';
import './Caption.scss'

const Caption: FC<CaptionProps> = ({ children }) => (
  <BulmaHeading
    size={5}
    weight="normal"
    renderAs="h3"
    className="caption"
    subtitle
    textTransform="uppercase"
  >
    {children}
  </BulmaHeading>
)

export default Caption
