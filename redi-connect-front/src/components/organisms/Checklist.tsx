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

  const steps = {
    mentor: [1, 2, 3, 4, 5, 6],
    mentee: [1, 2, 3, 4, 5]
  }

  return (
    <Section className="default-background">
      <Container>
        <DecoratedHeadline
          title={t(`loggedOutArea.homePage.checklist.${type}.title`)}
          headline={t(`loggedOutArea.homePage.checklist.${type}.headline`)}
        />
        <Element renderAs="ul" className="checklist">
          {steps[type].map((number) => (
            <Element
              key={number}
              textSize={4}
              renderAs="li"
              className="checklist__item"
              responsive={{ mobile: { textSize: { value: 5 } } }}
            >
              {t(`loggedOutArea.homePage.checklist.${type}.point${number}`)}
            </Element>
          ))}
        </Element>
      </Container>
    </Section >
  )
}

export default Checklist
