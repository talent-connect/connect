import React from 'react'
import { Section, Container, Element } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import TitleHeadline from '../atoms/TitleHeadline'
import './Checklist.scss'

interface Props {
  type: 'mentor' | 'mentee'
}

const Checklist = ({ type }: Props) => {
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <TitleHeadline
          title={t(`loggedOutArea.homePage.checklist.${type}.title`)}
          headline={t(`loggedOutArea.homePage.checklist.${type}.headline`)}
        />
        <Element renderAs="ul" className="checklist">
          {[1, 2, 3, 4, 5].map((number) => (
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
