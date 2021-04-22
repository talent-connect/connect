import React from 'react'
import { Content } from 'react-bulma-components'

const Placeholder: React.FunctionComponent = ({ children }) => (
  <Content textColor="grey-dark" italic>
    {children}
  </Content>
)

export default Placeholder
