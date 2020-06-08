import React from 'react';
import { Section, Container, Element, Columns } from 'react-bulma-components'
import Heading from '../atoms/Heading'
import { ReactComponent as Check } from '../../assets/images/checkmark.svg'

const checks = {
  mentor: [
    'I work in the digital industry',
    'I am willing to share knowledge and experiences with others',
    'I am open to meet other nationalities',
    'I have the time to meet mentees during my free time',
    'I have time to support on a personal and professional level'
  ],
  mentee: [
    'I am a student or student alumni at ReDI school',
    'I would like help on my classes and/or career development',
    'I would like to get guidance from an expert from the digital industry',
    'I can make time to meet with a mentor on a regular basis',
    'I am open to get feedback on the topics I disscuss with my mentor'
  ]
}

interface CustomProps {
  title: string
  headline: string
  checks?: Array<string>
}

interface DefaultProps {
  type: 'mentor' | 'mentee'
}

const Checklist = ({ title, headline, checks }: CustomProps) => {
  return (
    <Section className="default-background">
      <Container className="double-block-space">
        <Element
          renderAs="h4"
          textAlignment="centered"
          textTransform="uppercase"
          textSize={6}
          responsive={{ mobile: { textSize: { value: 7 } } }}
        >
          {title}
        </Element>
        <Heading size="medium" border="topCenter" center>{headline}</Heading>
      </Container>
      <Container>
        {checks && checks.map((item: string) => (
          <Columns vCentered breakpoint="mobile" key={item}>
            <Columns.Column
              desktop={{ offset: 3 }}
              tablet={{ offset: 2 }}
              className="is-flex"
              narrow
            >
              <Check />
            </Columns.Column>
            <Columns.Column>
              <Element
                textSize={4}
                responsive={{ mobile: { textSize: { value: 5 } } }}
              >
                {item}
              </Element>
            </Columns.Column>
          </Columns>
        ))}
      </Container>
    </Section >
  );
};

const DefaultChecklist = ({ type }: DefaultProps) => {
  const title = `the ${type} checklist`;
  const headline = `Are you ready to become a ${type}?`;

  return (
    <Checklist title={title} headline={headline} checks={checks[type]} />
  )
}

export default {
  Custom: ({ title, headline, checks }: CustomProps) => <Checklist title={title} headline={headline} checks={checks} />,
  Default: ({ type }: DefaultProps) => <DefaultChecklist type={type} />
};