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

function RediProgram() {
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
          {programSteps.map(({ image, content, headline }) => (
            <Columns.Column textAlignment="centered" key={content}>
              <Icon icon={image} size="x-large" className="program__img" />
              <Heading
                size={4}
                renderAs="h3"
                marginless
                responsive={{ tablet: { hide: { value: true } } }}
              >
                {headline}
              </Heading>
              <Element
                textSize={4}
                className="program__text"
                responsive={{ mobile: { textSize: { value: 5 } } }}
              >
                {content}
              </Element>
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Section>
  )
}

export default RediProgram
