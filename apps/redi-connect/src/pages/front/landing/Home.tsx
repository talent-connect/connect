import { FunctionComponent } from 'react'
import Landing from '../../../components/templates/Landing'
import { useTranslation } from 'react-i18next'
import Hero from '../../../components/organisms/RediHero'
import NavTiles from '../../../components/organisms/NavTiles'
import RediProgram from '../../../components/organisms/RediProgram'
import Carousel from '../../../components/organisms/Carousel'
import PreFooter from '../../../components/organisms/PreFooter'

const Home: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <Landing>
      <Hero />
      <NavTiles />
      <RediProgram />
      {/* // TODO: had to disable the entire carousel on 21 July 2021.
      We upgraded // to latest Nx version and relative imports done INSIDE of
      slick-carousel broke. */}
      {/* <Carousel
        border="orange"
        headline={t('loggedOutArea.homePage.carousel.headlineAbout')}
        title={t('loggedOutArea.homePage.carousel.titleAbout')}
      /> */}
      <PreFooter />
    </Landing>
  )
}

export default Home