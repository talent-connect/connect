import { Element } from 'react-bulma-components'

import { Heading } from '../Heading'
import { DecoratedHeadlineProps } from './DecoratedHeadline.props';
import './DecoratedHeadline.scss'

function DecoratedHeadline ({ title, headline }: DecoratedHeadlineProps) {
  return (
    <div className="decorated-headline">
      <Element
        renderAs="h4"
        textAlignment="centered"
        textTransform="uppercase"
        textSize={6}
        responsive={{ mobile: { textSize: { value: 6 } } }}
      >
        {title}
      </Element>
      <Heading center size="medium" border="topCenter">
        {headline}
      </Heading>
    </div>
  )
}

export default DecoratedHeadline
