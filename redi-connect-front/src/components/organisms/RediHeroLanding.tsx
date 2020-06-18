import React from 'react'
import classnames from 'classnames'
import { Section, Container, Element, Heading, Content, Columns } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Icon from '../atoms/Icon'
import Image from '../atoms/Image'
import './RediHeroLanding.scss'

interface Props {
  type: 'mentor' | 'mentee'
}

const RediHeroLanding = ({ type }: Props) => {
  const { t } = useTranslation()
  const programSteps: Array<{ name: string, image: any }> =
    t(`loggedOutArea.homePage.hero.${type}.steps`, { returnObjects: true })
  const baseClass = `${type}-border-color`

  return (
    <>
      <Section className={classnames({ [`hero-landing--${type}`]: type })}>
        <Container>
          <Heading
            size={1}
            responsive={{
              mobile: { textSize: { value: 2 } },
              tablet: { textAlignment: { value: 'centered' } }
            }}
          >
            {t(`loggedOutArea.homePage.hero.${type}.headline`)}
          </Heading>
          <Content responsive={{
            mobile: { textAlignment: { value: 'centered' } },
            'tablet-only': { hide: { value: true } }
          }}>
            <Image image={type} className={classnames('hero-landing__illustration', {
              [`hero-landing__illustration--${type}`]: type
            })} />
          </Content>
          <Element
            renderAs="p"
            textSize={4}
            responsive={{
              tablet: { textAlignment: { value: 'centered' } },
              mobile: { textSize: { value: 5 } }
            }}
            className="hero-landing__content"
          >
            {t(`loggedOutArea.homePage.hero.${type}.content`)}
          </Element>
          <Columns className="default-background hero-landing__columns">
            <Columns.Column narrow>
              <Icon icon='arrow' size="large" className={`${baseClass} hero-landing__icon--arrow`} />
              <Element
                textSize={7}
                renderAs="p"
                textTransform="uppercase"
                className="hero-landing__icon--name"
              >
                {t(`loggedOutArea.homePage.hero.${type}.programName`)}
              </Element>
            </Columns.Column>
            {programSteps.map((step, index) =>
              <Columns.Column key={index} className={`${baseClass} hero-landing__column`}>
                <Icon icon={step.image} size="large" className={baseClass} />
                <Element
                  renderAs="hr"
                  responsive={{ mobile: { hide: { value: true } } }}
                  className={`${baseClass} hero-landing__separator`}
                />
                <Element
                  textSize={5}
                  renderAs="p"
                >
                  <strong>{`0${index + 1}`}</strong><br />
                  {step.name}
                </Element>
              </Columns.Column>
            )}
          </Columns>
        </Container>
      </Section>
    </>
  )
}

export default RediHeroLanding
