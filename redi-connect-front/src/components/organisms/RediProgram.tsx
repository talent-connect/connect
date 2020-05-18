import React from 'react'
import {
  Container,
  Section,
  Columns,
  Image,
  Level,
  Element,
  Heading as BulmaHeading
} from 'react-bulma-components'
import Heading from '../atoms/Heading'
import career from '../../assets/images/career.svg'
import search from '../../assets/images/search.svg'
import calender from '../../assets/images/calender.svg'
import offline from '../../assets/images/offline.svg'
import './RediProgram.scss'

const programSteps = [
  {
    image: search,
    content: 'Connect yourself with the right mentor/ mentee ',
    headline: '1. Set up your profile'
  },
  {
    image: career,
    content: 'Get/ give career and personal advice and support ',
    headline: '2. Get connected'
  },
  {
    image: calender,
    content: 'Schedule meetings to stay on track',
    headline: '3. Plan meetings'
  },
  {
    image: offline,
    content: 'Get advice on how to best connect offline',
    headline: '4. Meet in real life'
  }
]

const RediProgram = () => {
  return (
    <Section className="default-background">
      <Container>
        <Element
          className="is-uppercase is-size-6 is-size-7-mobile has-text-centered"
          renderAs="h4"
        >
          about redi connect
        </Element>
        <Heading size="small" border="topCenter" center>What our Mentorship Program is all about ...</Heading>
      </Container>
      <Container>
        <Columns>
          {programSteps.map(step => (
            <Columns.Column className="has-text-centered" key={step.content}>
              <Image src={step.image} className="program__img" />
              <BulmaHeading
                size={4}
                renderAs="h3"
                className="is-hidden-tablet is-marginless"
              >
                {step.headline}
              </BulmaHeading>
              <Level className="is-size-4 is-size-5-mobile program__text">
                {step.content}
              </Level>
            </Columns.Column>
          ))}
        </Columns>
      </Container>
    </Section>
  )
}

export default RediProgram
