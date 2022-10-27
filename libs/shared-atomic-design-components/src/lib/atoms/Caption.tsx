import React from 'react'
import { Heading as BulmaHeading } from 'react-bulma-components'
import './Caption.scss'

const Caption: React.FunctionComponent<{ bold?: boolean }> = ({
  bold = false,
  children,
}) => (
  <BulmaHeading
    size={5}
    weight={bold ? 'bold' : 'normal'}
    renderAs="h3"
    className="caption"
    subtitle
    textTransform="uppercase"
  >
    {children}
  </BulmaHeading>
)

export default Caption
