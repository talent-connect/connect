import { Button } from '@talent-connect/shared-atomic-design-components'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Checklist from '../../../components/organisms/Checklist'
import PreFooter from '../../../components/organisms/PreFooter'
import RediHeroLanding from '../../../components/organisms/RediHeroLanding'
import Landing from '../../../components/templates/Landing'
import { isLoggedIn } from '../../../services/auth/auth'
import { Section, Container, Element } from 'react-bulma-components'

const Mentee: FunctionComponent = () => {
  const { t } = useTranslation()
  const title = t('loggedOutArea.homePage.carousel.titleMentorOrMentee')
  const headline = t('loggedOutArea.homePage.carousel.headlineMentorOrMentee')
  const history = useHistory()

  return (
    <Landing>
      <RediHeroLanding type="mentee" />
      <Checklist type="mentee" />
      {!isLoggedIn() ? (
        <Section>
          <Container style={{ textAlign: 'center' }}>
            <Button onClick={() => history.push('/front/signup-landing')}>
              {t('button.signUp')}
            </Button>
          </Container>
        </Section>
      ) : null}
      {/* <Carousel border="orange" headline={headline} title={title} /> */}
      <PreFooter />
    </Landing>
  )
}

export default Mentee
