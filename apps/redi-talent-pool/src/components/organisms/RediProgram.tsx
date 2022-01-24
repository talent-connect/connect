import {
  DecoratedHeadline,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { FC } from 'react'
import {
  Columns,
  Container,
  Element,
  Heading,
  Section,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import './RediProgram.scss'

const RediProgram: FC = () => {
  const { t } = useTranslation()

  const programSteps: { content: string; headline: string; image: any; }[] =
    t('loggedOutArea.homePage.program.steps', { returnObjects: true })

  return (
    <Section className="default-background">
      <Container>
        <DecoratedHeadline
          title={t('loggedOutArea.homePage.program.subHeadline')}
          headline={t('loggedOutArea.homePage.program.headline')}
        />
        <Columns>
          {programSteps.map((step) => (
            <Columns.Column textAlignment="centered" key={step.content}>
              <Icon icon={step.image} size="x-large" className="program__img" />
              <Heading
                size={4}
                renderAs="h3"
                marginless
                responsive={{ tablet: { hide: { value: true } } }}
              >
                {step.headline}
              </Heading>
              <Element
                textSize={4}
                className="program__text"
                responsive={{ mobile: { textSize: { value: 5 } } }}
              >
                {step.content}
              </Element>
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Section>
  )
}

export default RediProgram
