import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Section,
  Columns,
  Content,
  Element,
} from 'react-bulma-components'
import { ReactComponent as Deloitte } from '../../assets/images/deloitte.svg'
import './RediHero.scss'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { envRediLocation } from '../../utils/env-redi-location'
import {
  Button,
  Heading,
  SVGImage,
} from '@talent-connect/shared-atomic-design-components'

const RediHero() {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={5}>
            <Heading>
              {t('loggedOutArea.homePage.hero.about.headline')}{' '}
              {REDI_LOCATION_NAMES[envRediLocation()]}
            </Heading>
            <Deloitte className="oneandhalf-bs redi-hero__icon" />
            <Columns.Column responsive={{ tablet: { hide: { value: true } } }}>
              <SVGImage image="hero" className="redi-hero__image" />
            </Columns.Column>
            <Element
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              {t('loggedOutArea.homePage.hero.about.content1')}
              <br />
              {t('loggedOutArea.homePage.hero.about.content2')}
            </Element>
            <Content>
              <Button
                size="large"
                onClick={() => history.push('/front/signup-landing')}
              >
                {t('button.signUpNow')}
              </Button>
            </Content>
          </Columns.Column>
          <Columns.Column
            offset={1}
            responsive={{ mobile: { hide: { value: true } } }}
          >
            <SVGImage image="hero" className="redi-hero__image" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default RediHero
