import Landing from '../../../components/templates/Landing'
import classnames from 'classnames'

import { useTranslation } from 'react-i18next'
import {
  Section,
  Container,
  Element,
  Columns,
  Content,
} from 'react-bulma-components'
import {
  Heading,
  Button,
  SVGImage,
} from '@talent-connect/shared-atomic-design-components'
import { ReactComponent as RediLogo } from '../../../assets/images/logo.svg'
import { ReactComponent as Deloitte } from '../../../assets/images/deloitte.svg'

import '../../../components/organisms/Navbar.scss'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { objectEntries } from '@talent-connect/typescript-utilities'

function LocationPicker () {
  const { t } = useTranslation()
  return (
    <>
      <Section className={classnames('navbar default-background')}>
        <Container className="navbar__wrapper">
          <RediLogo />
        </Container>
      </Section>
      <Section className="default-background">
        <Container>
          <Columns vCentered>
            <Columns.Column size={5}>
              <Heading>
                {t('loggedOutArea.homePage.hero.about.headline')}
              </Heading>
              <Deloitte className="oneandhalf-bs redi-hero__icon" />
              <Columns.Column
                responsive={{ tablet: { hide: { value: true } } }}
              >
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
                <Heading size="medium">Pick your location:</Heading>
              </Content>
              {objectEntries(REDI_LOCATION_NAMES).map(([key, value]) => (
                <Button to={`https://connect.${key}.redi-school.org`}>
                  {value}
                </Button>
              ))}
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
      <Section>
        <Container></Container>
      </Section>
    </>
  )
}

export default LocationPicker