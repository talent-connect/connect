import React, { useState } from 'react'
import Landing from '../../components/templates/Landing'
import {
  Section,
  Container,
  Columns,
  Element,
  Heading as BulmaHeading,
} from 'react-bulma-components'
import { useTranslation, Trans } from 'react-i18next'
import classnames from 'classnames'
import Icon from '../../components/atoms/Icon'
import Heading from '../../components/atoms/Heading'
import './Faqs.scss'

interface Props {
  question: string
  answer: string
}

const Faq = ({ question, answer }: Props) => {
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

const Faqs = () => {
  const { t } = useTranslation()

  const topics: Array<{ title: string; qAndAs: Array<any> }> = t('faq.topics', {
    returnObjects: true,
  })

  return (
    <Landing>
      <Section>
        <Container>
          <Columns>
            <Columns.Column desktop={{ size: 10, offset: 1 }}>
              <Heading size="medium" border="bottomLeft" className="double-bs">
                {t('faq.headline')}
              </Heading>
              {topics.map((topic) => (
                <div className="faq-block">
                  <BulmaHeading size={4} className="faq-block__title" subtitle>
                    {topic.title}
                  </BulmaHeading>
                  {topic.qAndAs.map((item, index) => (
                    <Faq
                      key={index}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              ))}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </Landing>
  )
}

export default Faqs
