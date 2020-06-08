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
import { ReactComponent as Chat } from '../../assets/images/chat.svg'
import { ReactComponent as Handshake } from '../../assets/images/handshake.svg'

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
      image: Chat,
      content: t('loggedOutArea.homePage.program.steps.step3.content'),
      headline: t('loggedOutArea.homePage.program.steps.step3.headline')
    },
    {
      image: Handshake,
      content: t('loggedOutArea.homePage.program.steps.step4.content'),
      headline: t('loggedOutArea.homePage.program.steps.step4.headline')
    }
  ]

  return (
    <Section className="default-background">
      <Container>
        <Element
          textSize={6}
          renderAs="h4"
          textAlignment="centered"
          textTransform="uppercase"
          responsive={{ mobile: { textSize: { value: 7 } } }}
        >
          {t('loggedOutArea.homePage.program.subHeadline')}
        </Element>
        <Heading size="medium" border="topCenter" center>{t('loggedOutArea.homePage.program.headline')}</Heading>
      </Container>
      <Container>
        <Columns>
          {programSteps.map(({ image: MyImage, content, headline }) =>
            <Columns.Column textAlignment="centered" key={content}>
              <MyImage className="program__img" />
              <BulmaHeading
                size={4}
                marginless
                renderAs="h3"
                responsive={{ tablet: { hide: { value: true } } }}
              >
                {headline}
              </BulmaHeading>
              <Level
                textSize={4}
                responsive={{ mobile: { textSize: { value: 5 } } }}
                className="program__text"
              >
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
