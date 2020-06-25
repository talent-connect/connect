import React from 'react'
import {
  Container,
  Section,
  Columns,
  Content
} from 'react-bulma-components'
import Heading from '../atoms/Heading'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../atoms/Button'
import team from '../../assets/images/hero.svg'
import { ReactComponent as Deloitte } from '../../assets/images/deloitte.svg'

const RediHero = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={5}>
            <Heading>
              {t('loggedOutArea.homePage.hero.headline')}
            </Heading>
            <Deloitte className="oneandhalf-bs" />
            <Columns.Column responsive={{ tablet: { hide: { value: true } } }}>
              <img src={team} alt="team" />
            </Columns.Column>
            <Content
              renderAs="p"
              className="is-size-4 is-size-5-mobile oneandhalf-bs"
            >
              {t('loggedOutArea.homePage.hero.content1')}<br />{t('loggedOutArea.homePage.hero.content2')}
            </Content>
            <Content>
              <Button size="large" onClick={() => history.push('/front/signup-landing')} >
                {t('button.signUpNow')}
              </Button>
            </Content>
          </Columns.Column>
          <Columns.Column offset={1} responsive={{ mobile: { hide: { value: true } } }}>
            <img src={team} alt="team" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default RediHero
