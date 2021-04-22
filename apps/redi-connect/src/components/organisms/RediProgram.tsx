import React from 'react'
import {
  Container,
  Section,
  Columns,
  Element,
  Heading,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import DecoratedHeadline from '../atoms/DecoratedHeadline'
import Icon from '../atoms/Icon'

import './RediProgram.scss'

const RediProgram = () => {
  const { t } = useTranslation()

  const programSteps: Array<{
    content: string
    headline: string
    image: any
  }> = t('loggedOutArea.homePage.program.steps', { returnObjects: true })

  return (
    <Section className="default-background">
      <Container>
        <DecoratedHeadline
          title={t('loggedOutArea.homePage.program.subHeadline')}
          headline={t('loggedOutArea.homePage.program.headline')}
        />
        <Columns>
          {programSteps.map((step: any) => (
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
