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
import { ReactComponent as Career } from '../../assets/images/career.svg'
import { ReactComponent as Search } from '../../assets/images/search.svg'
import { ReactComponent as Calender } from '../../assets/images/calender.svg'
import { ReactComponent as Offline } from '../../assets/images/offline.svg'

import './RediProgram.scss'

const RediProgram = () => {
  const { t } = useTranslation()

  const programSteps = [
    {
      image: Career,
      content: t('loggedOutArea.homePage.program.steps.step1.content'),
      headline: t('loggedOutArea.homePage.program.steps.step1.headline')
    },
    {
      image: Search,
      content: t('loggedOutArea.homePage.program.steps.step2.content'),
      headline: t('loggedOutArea.homePage.program.steps.step2.headline')
    },
    {
      image: Calender,
      content: t('loggedOutArea.homePage.program.steps.step3.content'),
      headline: t('loggedOutArea.homePage.program.steps.step3.headline')
    },
    {
      image: Offline,
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
        <Heading size="medium" border="topCenter" center>{t('loggedOutArea.homePage.program.headline')}</Heading>
      </Container>
      <Container>
        <Columns>
          {programSteps.map(({ image: MyImage, content, headline }) =>
            <Columns.Column className="has-text-centered" key={content}>
              <MyImage className="program__img"/>
              <BulmaHeading
                size={4}
                renderAs="h3"
                className="is-hidden-tablet is-marginless"
              >
                {headline}
              </BulmaHeading>
              <Level className="is-size-4 is-size-5-mobile program__text">
                {content}
              </Level>
            </Columns.Column>
          )}
        </Columns>
      </Container>
    </Section>
  )
}

export default RediProgram
