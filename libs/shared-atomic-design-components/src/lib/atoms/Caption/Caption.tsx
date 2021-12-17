import { FunctionComponent } from 'react'
import { Heading as BulmaHeading } from 'react-bulma-components'
import './Caption.scss'

const Caption: FunctionComponent = ({ children }) => (
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
