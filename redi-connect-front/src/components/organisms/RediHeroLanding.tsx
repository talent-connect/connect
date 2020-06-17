import React from 'react'
import classnames from 'classnames'
import { Section, Container, Element, Heading, Content, Columns } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Icon from '../atoms/Icon'
import './RediHeroLanding.scss'

interface Props {
  type: 'mentor' | 'mentee'
}

const RediHeroLanding = ({ type }: Props) => {
  const { t } = useTranslation()
  const programSteps: Array<{name: string, image: any }> =
  t(`loggedOutArea.homePage.hero.${type}.steps`, { returnObjects: true })
  const baseClass = `${type}-border-color`

  return (
    <>
      <Section className={classnames({ [`redi-hero--${type}`]: type })}>
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
            <Icon icon={type} size="default" className={classnames('redi-hero__illustration', {
              [`redi-hero__illustration--${type}`]: type
            })} />
          </Content>
          <Element
            renderAs="p"
            textSize={4}
            responsive={{
              tablet: { textAlignment: { value: 'centered' } },
              mobile: { textSize: { value: 5 } }
            }}
            className="redi-hero__content"
          >
            {t(`loggedOutArea.homePage.hero.${type}.content`)}
          </Element>
          <Columns className="default-background redi-hero__columns">
            <Columns.Column narrow>
              <Icon icon='arrow' size="large" className={`${baseClass} redi-hero__icon--arrow`} />
              <Element
                textSize={7}
                renderAs="p"
                textTransform="uppercase"
                className="redi-hero__icon--name"
              >
                {t(`loggedOutArea.homePage.hero.${type}.programName`)}
              </Element>
            </Columns.Column>
            {programSteps.map((step, index) =>
              <Columns.Column key={index} className={`${baseClass} redi-hero__column`}>
                <Icon icon={step.image} size="large" className={baseClass} />
                <Element
                  renderAs="hr"
                  responsive={{ mobile: { hide: { value: true } } }}
                  className={`${baseClass} redi-hero__separator`}
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
