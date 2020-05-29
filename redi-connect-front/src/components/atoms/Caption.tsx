import React from 'react'
import { Heading as BulmaHeading } from 'react-bulma-components'

const Caption: React.FunctionComponent = ({ children }) => (
  <BulmaHeading
    size={5}
    weight="normal"
    renderAs="h3"
    subtitle
    textTransform="uppercase"
  >
    {children}
  </BulmaHeading>
)

export default Caption
