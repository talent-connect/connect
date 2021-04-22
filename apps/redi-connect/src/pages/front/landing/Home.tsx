import React from 'react'
import Landing from '../../../components/templates/Landing'
import { useTranslation } from 'react-i18next'
import Hero from '../../../components/organisms/RediHero'
import NavTiles from '../../../components/organisms/NavTiles'
import RediProgram from '../../../components/organisms/RediProgram'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'

export default function Home() {
  const { t } = useTranslation()
  return (
    <Landing>
      <Hero />
      <NavTiles />
      <RediProgram />
      <Carousel
        border="orange"
        headline={t('loggedOutArea.homePage.carousel.headlineAbout')}
        title={t('loggedOutArea.homePage.carousel.titleAbout')}
      />
      <PreFooter />
    </Landing>
  )
}
