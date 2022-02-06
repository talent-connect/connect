import { Content } from 'react-bulma-components'
import { PlaceholderProps } from './Placeholder.props';

function Placeholder ({ children }: PlaceholderProps) {
  return (
    <Content
      textColor="grey-dark"
      italic
    >
      {children}
    </Content>
  );
}

export default Placeholder
