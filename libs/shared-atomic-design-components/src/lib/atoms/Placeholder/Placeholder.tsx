import { FC } from 'react'
import { Content } from 'react-bulma-components'
import { PlaceholderProps } from './Placeholder.props';

const Placeholder: FC<PlaceholderProps> = ({ children }) => (
  <Content
    textColor="grey-dark"
    italic
  >
    {children}
  </Content>
)

export default Placeholder
