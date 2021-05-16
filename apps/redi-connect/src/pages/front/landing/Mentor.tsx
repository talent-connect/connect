import React from 'react'
import Landing from '../../../components/templates/Landing'
import RediHeroLanding from '../../../components/organisms/RediHeroLanding'
import Checklist from '../../../components/organisms/Checklist'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'
import { useTranslation } from 'react-i18next'

const Mentor = () => {
  const { t } = useTranslation()
  const title = t('loggedOutArea.homePage.carousel.titleMentorOrMentee')
  const headline = t('loggedOutArea.homePage.carousel.headlineMentorOrMentee')

  return (
    <Landing>
      <RediHeroLanding type="mentor" />
      <Checklist type="mentor" />
      <Carousel border="blue" title={title} headline={headline} />
      <PreFooter />
    </Landing>
  )
}

export default Mentor
