import {
  Heading as BulmaHeading,
  Columns,
  Container,
  Section,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Landing from '../../components/templates/Landing'

import {
  FaqItem,
  Heading,
} from '@talent-connect/shared-atomic-design-components'

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
