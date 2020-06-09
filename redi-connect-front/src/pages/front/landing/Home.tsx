import React from 'react'
import Landing from '../../../components/templates/Landing'
import { useTranslation } from 'react-i18next'
import Hero from '../../../components/organisms/RediHero'
import RediProgram from '../../../components/organisms/RediProgram'
import Checklist from '../../../components/organisms/Checklist'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'

export default function Home () {
  const { t } = useTranslation()
  return (
    <Landing>
      <Hero />
      <RediProgram />
      <Carousel
        border="orange"
        headline={t('loggedOutArea.homePage.carousel.headline')}
        title={t('loggedOutArea.homePage.carousel.title')}
      />
      <PreFooter />
    </Landing>
  )
}
