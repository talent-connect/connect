import { Heading as BulmaHeading } from 'react-bulma-components'
import { CaptionProps } from './Caption.props';
import './Caption.scss'

function Caption ({ children }: CaptionProps) {
  return (
    <BulmaHeading
      size={5}
      weight="normal"
      renderAs="h3"
      className="caption"
      textTransform="uppercase"
      subtitle
    >
      {children}
    </BulmaHeading>
  );
}

export default Caption
