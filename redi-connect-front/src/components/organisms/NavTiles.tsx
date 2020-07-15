import React from 'react'
import { Section, Container, Heading } from 'react-bulma-components'
import DecoratedHeadline from '../atoms/DecoratedHeadline'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import './NavTiles.scss'

const NavTiles = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const navigateToTopOfLanding = (type: string) => {
    window.scrollTo(0, 0)
    history.push(`/front/landing/${type}`)
  }

  const renderType = (name: string) => {
    const imgName: any = `${name}`
    const buttonColor: any = name === 'mentor' ? 'blue' : 'orange'
    const arrow: any = `arrowRight${name.charAt(0).toUpperCase() + name.slice(1)}`

    return (
      <div className="tiles__type">
        <Icon icon={imgName} className="tiles__image" />
        <Heading
          size={2}
          marginless
          responsive={{ mobile: { textSize: { value: 4 } } }}
        >
          {t('loggedOutArea.homePage.hero.navTiles.description')} {t(`loggedOutArea.homePage.hero.navTiles.${name}`)}?
        </Heading>
        <Button
          simple
          color={buttonColor}
          onClick={() => navigateToTopOfLanding(name)}
        >
          {t('loggedOutArea.homePage.hero.navTiles.button')}
          <Button.Icon icon={arrow} space="left" />
        </Button>

      </div>
    )
  }

  return (
    <Section>
      <Container>
        <DecoratedHeadline
          title={t('loggedOutArea.homePage.hero.navTiles.title')}
          headline={t('loggedOutArea.homePage.hero.navTiles.headline')}
        />
        <div className="tiles">
          {renderType('mentee')}
          {renderType('mentor')}
        </div>
      </Container>
    </Section>
  )
}

export default NavTiles
