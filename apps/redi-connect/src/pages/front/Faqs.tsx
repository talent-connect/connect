import { useTranslation } from 'react-i18next'
import Landing from '../../components/templates/Landing'
import {
  Section,
  Container,
  Columns,
  Heading as BulmaHeading,
} from 'react-bulma-components'
import './Faqs.scss'
import {
  Heading,
  FaqItem,
} from '@talent-connect/shared-atomic-design-components'

type QandA = { question: string; answer: string; };

function Faqs() {
  const { t } = useTranslation()

  const topics: { title: string; qAndAs: QandA[] }[] = t('faq.topics', { returnObjects: true })

  return (
    <Landing>
      <Section>
        <Container>
          <Columns>
            <Columns.Column desktop={{ size: 10, offset: 1 }}>
              <Heading size="medium" border="bottomLeft" className="double-bs">
                {t('faq.headline')}
              </Heading>
              {topics.map(({ title, qAndAs }) => (
                <div className="faq-block">
                  <BulmaHeading size={4} className="faq-block__title" subtitle>
                    {title}
                  </BulmaHeading>
                  {qAndAs.map((QAndA, i) => (
                    <FaqItem {...QAndA} key={i} />
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
