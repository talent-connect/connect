import React from 'react'
import classnames from 'classnames'
import { Section, Container, Element, Heading, Content, Columns } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import SVGImage from '../atoms/SVGImage'

import './RediHeroProgram.scss'

interface Props {
  type: 'mentor' | 'mentee'
}

const programIcons = [
  {
    name: 'career'
  },
  {
    name: 'clipboard'
  },
  {
    name: 'search'
  },
  {
    name: 'calendar'
  },
  {
    name: 'certificate'
  }
]

const RediHeroProgram = ({ type }: Props) => {
  const { t } = useTranslation()
  const typeSpecificClass = (className: string) => (classnames(`redi-hero__${className}`, {
    [`redi-hero__${className}--${type}`]: type
  }))

  return (
    <>
      <Section className={classnames({ [`redi-hero__background--${type}`]: type })}>
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
            <SVGImage image={type} className={typeSpecificClass('illustration')} />
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
              <SVGImage image='arrow' className={`redi-hero__icon--arrow ${typeSpecificClass('icon')}`} />
              <Element
                textSize={7}
                renderAs="p"
                textTransform="uppercase"
                className="redi-hero__icon--name"
              >
                {t(`loggedOutArea.homePage.hero.${type}.steps.name`)}
              </Element>
            </Columns.Column>
            {programIcons.map((icon: any, index) =>
              <Columns.Column key={index} className={typeSpecificClass('column')}>
                <SVGImage image={icon.name} className={typeSpecificClass('icon')} />
                <hr className={typeSpecificClass('separator')} />
                <Element
                  textSize={5}
                  renderAs="p"
                >
                  <strong>{`0${index + 1}`}</strong><br />
                  {t(`loggedOutArea.homePage.hero.${type}.steps.step${index + 1}`)}
                </Element>
              </Columns.Column>
            )}
          </Columns>
        </Container>
      </Section>
    </>
  )
}

export default RediHeroProgram
