
import React from 'react'
import Landing from '../../../components/templates/Landing'
import RediHeroLanding from '../../../components/organisms/RediHeroLanding'
import Checklist from '../../../components/organisms/Checklist'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'
import { useTranslation } from 'react-i18next'

const Mentee = () => {
  const { t } = useTranslation()
  const title = t('loggedOutArea.homePage.carousel.titleMentorOrMentee')
  const headline = t('loggedOutArea.homePage.carousel.headlineMentorOrMentee')

  return (
    <Landing>
      <RediHeroLanding type="mentee" />
      <Checklist type="mentee" />
      <Carousel
        border="orange"
        headline={headline}
        title={title}
      />
      <PreFooter />
    </Landing>
  )
}

export default Mentee
