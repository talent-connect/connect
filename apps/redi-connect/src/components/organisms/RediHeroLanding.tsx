import { FC } from 'react'
import classnames from 'classnames'
import {
  Section,
  Container,
  Element,
  Heading,
  Content,
  Columns,
} from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import './RediHeroLanding.scss'
import {
  Icon,
  SVGImage,
  SVGTypes,
} from '@talent-connect/shared-atomic-design-components'

interface Props {
  type: 'mentor' | 'mentee'
}

interface imageType {
  mentor: SVGTypes
  mentee: SVGTypes
}

const typeToSvgImageMap: imageType = {
  mentor: 'heroMentor',
  mentee: 'heroMentee',
}

const RediHeroLanding: FC<Props> = ({ type }) => {
  const { t } = useTranslation()
  const programSteps: { name: string; image: any; }[] =
    t(`loggedOutArea.homePage.hero.${type}.steps`, { returnObjects: true })

  return (
    <Section
      className={classnames('hero-landing', {
        [`hero-landing--${type}`]: type,
      })}
    >
      <Container>
        <Heading
          size={1}
          responsive={{
            mobile: { textSize: { value: 2 } },
            tablet: { textAlignment: { value: 'centered' } },
          }}
        >
          {t(`loggedOutArea.homePage.hero.${type}.headline`)}
        </Heading>
        <Content
          responsive={{
            mobile: { textAlignment: { value: 'centered' } },
            'tablet-only': { hide: { value: true } },
          }}
        >
          <SVGImage
            image={typeToSvgImageMap[type]}
            className={classnames('hero-landing__illustration', {
              [`hero-landing__illustration--${type}`]: type,
            })}
          />
        </Content>
        <Element
          renderAs="p"
          textSize={4}
          responsive={{
            tablet: { textAlignment: { value: 'centered' } },
            mobile: { textSize: { value: 5 } },
          }}
          className="hero-landing__text"
        >
          {t(`loggedOutArea.homePage.hero.${type}.content`)}
        </Element>
        <Columns className="hero-landing__columns">
          <Columns.Column narrow>
            <Icon
              icon="arrow"
              size="x-large"
              className="hero-landing__columns__arrow"
            />
            <Element
              textSize={7}
              renderAs="p"
              textTransform="uppercase"
              className="hero-landing__columns__name"
            >
              {t(`loggedOutArea.homePage.hero.${type}.programName`)}
            </Element>
          </Columns.Column>
          {programSteps.map((step, index) => (
            <Columns.Column key={index}>
              <Icon icon={step.image} size="x-large" />
              <Element
                renderAs="hr"
                responsive={{ mobile: { hide: { value: true } } }}
                className="hero-landing__columns__separator"
              />
              <Element textSize={5} renderAs="p">
                <strong>{`0${index + 1}`}</strong>
                <br />
                {step.name}
              </Element>
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Section>
  )
}

export default RediHeroLanding
