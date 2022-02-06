import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Section, Container } from 'react-bulma-components'

import { Button } from '@talent-connect/shared-atomic-design-components'
import Checklist from '../../../components/organisms/Checklist'
import PreFooter from '../../../components/organisms/PreFooter'
import RediHeroLanding from '../../../components/organisms/RediHeroLanding'
import Landing from '../../../components/templates/Landing'
import { isLoggedIn } from '../../../services/auth/auth'

function Mentor() {
  const { t } = useTranslation()
  const title = t('loggedOutArea.homePage.carousel.titleMentorOrMentee')
  const headline = t('loggedOutArea.homePage.carousel.headlineMentorOrMentee')
  const history = useHistory()

  return (
    <Landing>
      <RediHeroLanding type="mentor" />
      <Checklist type="mentor" />
      {!isLoggedIn() && (
        <Section>
          <Container style={{ textAlign: 'center' }}>
            <Button onClick={() => history.push('/front/signup-landing')}>
              {t('button.signUp')}
            </Button>
          </Container>
        </Section>
      )}
      {/* <Carousel border="blue" title={title} headline={headline} /> */}
      <PreFooter />
    </Landing>
  )
}

export default Mentor
