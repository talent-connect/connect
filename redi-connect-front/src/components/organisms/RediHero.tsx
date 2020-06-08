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
import './RediHero.scss'

const RediHero = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Columns>
          <Columns.Column size={5} className="rediHero__content">
            <Heading>
              {t('loggedOutArea.homePage.hero.headline')}
            </Heading>
            <Columns.Column responsive={{ tablet: { hide: { value: true } } }}>
              <img src={team} alt="team" />
            </Columns.Column>
            <Content
              renderAs="p"
              textSize={4}
              className="double-block-space"
              responsive={{ mobile: { textSize: { value: 5 } } }}
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
