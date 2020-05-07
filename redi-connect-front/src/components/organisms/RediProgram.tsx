import React from 'react'
import {
  Container,
  Section,
  Columns,
  Image,
  Level,
  Element,
  Heading as BulmaHeading
} from 'react-bulma-components'
import Heading from '../atoms/Heading'
import { useTranslation } from 'react-i18next'
import career from '../../assets/images/career.svg'
import search from '../../assets/images/search.svg'
import calender from '../../assets/images/calender.svg'
import offline from '../../assets/images/offline.svg'
import './RediProgram.scss'

const RediProgram = () => {
  const { t } = useTranslation()

  const programSteps = [
    {
      image: search,
      content: t('loggedOutArea.homePage.program.steps.step1.content'),
      headline: t('loggedOutArea.homePage.program.steps.step1.headline')
    },
    {
      image: career,
      content: t('loggedOutArea.homePage.program.steps.step2.content'),
      headline: t('loggedOutArea.homePage.program.steps.step2.headline')
    },
    {
      image: calender,
      content: t('loggedOutArea.homePage.program.steps.step3.content'),
      headline: t('loggedOutArea.homePage.program.steps.step3.headline')
    },
    {
      image: offline,
      content: t('loggedOutArea.homePage.program.steps.step4.content'),
      headline: t('loggedOutArea.homePage.program.steps.step4.headline')
    }
  ]

  return (
    <Section className="default-background">
      <Container>
        <Element
          className="is-uppercase is-size-6 is-size-7-mobile has-text-centered"
          renderAs="h4"
        >
          {t('loggedOutArea.homePage.program.subHeadline')}
        </Element>
        <Heading size="small" border="topCenter" center>{t('loggedOutArea.homePage.program.headline')}</Heading>
      </Container>
      <Container>
        <Columns>
          {programSteps.map(step => (
            <Columns.Column className="has-text-centered" key={step.content}>
              <Image src={step.image} className="program__img" />
              <BulmaHeading
                size={4}
                renderAs="h3"
                className="is-hidden-tablet is-marginless"
              >
                {step.headline}
              </BulmaHeading>
              <Level className="is-size-4 is-size-5-mobile program__text">
                {step.content}
              </Level>
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Section>
  )
}

export default RediProgram
