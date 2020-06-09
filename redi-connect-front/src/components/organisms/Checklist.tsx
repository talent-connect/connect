import React from 'react';
import { Section, Container, Element, Columns } from 'react-bulma-components'
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
        <Columns>
          {[1, 2, 3, 4, 5].map((number) => (
            <Columns.Column
              narrow
              key={number}
              desktop={{ offset: 3 }}
              tablet={{ offset: 1 }}
              className="checklist__icon content"
            >
              <Element textSize={4} responsive={{ mobile: { textSize: { value: 5 } } }}>
                {t(`loggedOutArea.homePage.checklist.${type}.point${number}`)}
              </Element>
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Section >
  );
};

export default Checklist