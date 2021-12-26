import { FC } from 'react'
import Landing from '../../components/templates/Landing'
import {
  Section,
  Container,
  Columns,
  Heading as BulmaHeading,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import './Faqs.scss'
import {
  Heading,
  FaqItem,
} from '@talent-connect/shared-atomic-design-components'

const Faqs: FC = () => {
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
                    <FaqItem
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
