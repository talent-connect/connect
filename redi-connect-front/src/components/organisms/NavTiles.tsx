import React from 'react'
import { Section, Container, Heading } from 'react-bulma-components'
import DecoratedHeadline from '../atoms/DecoratedHeadline'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, SVGImage } from '../atoms'
import { SVGImages } from '../atoms/SVGImage'
import './NavTiles.scss'

const NavTile = ({ name }: { name: string }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const navigateToTopOfLanding = (type: string) => {
    window.scrollTo(0, 0)
    history.push(`/front/landing/${type}`)
  }

  return (
    <div className="tiles__type">
      <SVGImage image={name as SVGImages} className="tiles__image" />
      <Heading
        size={2}
        textWeight="light"
        className="tiles__type__heading"
        marginless
        responsive={{ mobile: { textSize: { value: 4 } } }}
      >
        {t('loggedOutArea.homePage.hero.navTiles.description')} <strong>{t(`loggedOutArea.homePage.hero.navTiles.${name}`)}</strong>?
    </Heading>
      <Button
        simple
        className={`tiles__type__button tiles__type__button--${name}`}
        onClick={() => navigateToTopOfLanding(name)}
      >
        {t('loggedOutArea.homePage.hero.navTiles.button')}
        <Button.Icon icon="arrowRight" space="left" />
      </Button>
    </div>
  )
}

const NavTiles = () => {
  const { t } = useTranslation()

  return (
    <Section>
      <Container>
        <DecoratedHeadline
          title={t('loggedOutArea.homePage.hero.navTiles.title')}
          headline={t('loggedOutArea.homePage.hero.navTiles.headline')}
        />
        <div className="tiles">
          <NavTile name='mentee' />
          <NavTile name='mentor' />
        </div>
      </Container>
    </Section>
  )
}

export default NavTiles
