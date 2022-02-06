import {
  Button,
  Heading,
  SVGImage,
} from '@talent-connect/shared-atomic-design-components'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import {
  Columns,
  Container,
  Element,
  Level,
  Section,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { envRediLocation } from '../../utils/env-redi-location'
import './RediHero.scss'

function RediHero() {
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
            <Columns.Column responsive={{ tablet: { hide: { value: true } } }}>
              <SVGImage image="hello" className="redi-hero__image" />
            </Columns.Column>
            <Element
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              {t('loggedOutArea.homePage.hero.about.content1')}
            </Element>
            <Element
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              {t('loggedOutArea.homePage.hero.about.content2')}
            </Element>
            <Level>
              <Button
                size="large"
                onClick={() => history.push('/front/signup-landing')}
              >
                {t('button.signUpNow')}
              </Button>

              {/* <Button onClick={() => history.push('/front/login')} simple>
                {t('button.login')}
              </Button> */}
            </Level>
          </Columns.Column>
          <Columns.Column
            offset={1}
            responsive={{ mobile: { hide: { value: true } } }}
          >
            <SVGImage image="hello" className="redi-hero__image" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default RediHero
