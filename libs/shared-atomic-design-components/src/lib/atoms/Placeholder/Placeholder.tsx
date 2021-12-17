import { FunctionComponent } from 'react'
import { Content } from 'react-bulma-components'
import { PlaceholderProps } from './Placeholder.props';

const Placeholder: FunctionComponent<PlaceholderProps> = ({ children }) => (
  <Content textColor="grey-dark" italic>
    {children}
  </Content>
)

export default Placeholder
