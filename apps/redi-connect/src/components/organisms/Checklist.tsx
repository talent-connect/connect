import React from 'react'
import { Section, Container, Element } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import DecoratedHeadline from '../atoms/DecoratedHeadline'
import './Checklist.scss'

interface Props {
  type: 'mentor' | 'mentee'
}

const Checklist = ({ type }: Props) => {
  const { t } = useTranslation()

  const checklist: Array<{
    content: string
    headline: string
    image: any
  }> = t(`loggedOutArea.homePage.checklist.${type}.items`, {
    returnObjects: true,
  })

  return (
    <Section className="default-background">
      <Container>
        <DecoratedHeadline
          title={t(`loggedOutArea.homePage.checklist.${type}.title`)}
          headline={t(`loggedOutArea.homePage.checklist.${type}.headline`)}
        />
        <Element renderAs="ul" className="checklist">
          {checklist.map((item) => (
            <Element
              key={item}
              textSize={4}
              renderAs="li"
              className="checklist__item"
              responsive={{ mobile: { textSize: { value: 5 } } }}
            >
              {item}
            </Element>
          ))}
        </Element>
      </Container>
    </Section>
  )
}

export default Checklist
