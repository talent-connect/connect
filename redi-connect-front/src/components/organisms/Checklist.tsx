import React from 'react';
import { Section, Container, Element } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Heading from '../atoms/Heading'
import './Checklist.scss'

interface Props {
  type: 'mentor' | 'mentee'
}

const Checklist = ({ type }: Props) => {
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Element
          renderAs="h4"
          textAlignment="centered"
          textTransform="uppercase"
          textSize={6}
          responsive={{ mobile: { textSize: { value: 7 } } }}
        >
          {t(`loggedOutArea.homePage.checklist.${type}.title`)}
        </Element>
        <Heading
          center
          size="medium"
          border="topCenter"
          className="checklist__headline"
        >
          {t(`loggedOutArea.homePage.checklist.${type}.headline`)}
        </Heading>
        {[1, 2, 3, 4, 5].map((number) => (
          <Element
            key={number}
            textSize={4}
            className="checklist__icon"
            responsive={{ mobile: { textSize: { value: 5 } } }}
          >
            {t(`loggedOutArea.homePage.checklist.${type}.point${number}`)}
          </Element>
        ))}
      </Container>
    </Section >
  );
};

export default Checklist