import classnames from 'clsx'
import { FunctionComponent, useState } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { Icon } from '../../atoms'
import './FaqItem.scss'

interface Props {
  question: string
  answer: string
}

const FaqItem: FunctionComponent<Props> = ({ question, answer }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <div className="faq">
      <Columns
        breakpoint="mobile"
        className="faq__title"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <Columns.Column>
          <Element>{question}</Element>
        </Columns.Column>
        <Columns.Column narrow>
          <Icon
            icon="chevron"
            size="small"
            className={classnames({ 'icon--rotate': showAnswer })}
          />
        </Columns.Column>
      </Columns>
      <Element
        className={classnames('faq__answer', {
          'faq__answer--show': showAnswer,
        })}
      >
        <div dangerouslySetInnerHTML={{ __html: `${answer}` }} />
      </Element>
    </div>
  )
}

export default FaqItem
