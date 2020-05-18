import React from 'react'
import {
  Container,
  Section,
  Columns,
  Content
} from 'react-bulma-components'
import Heading from '../atoms/Heading'
import { useHistory } from 'react-router-dom'
import Button from '../atoms/Button'
import team from '../../assets/images/hero.svg'

const RediHero = () => {
  const history = useHistory()
  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={5}>
            <Heading>
            Welcome to ReDI Connect
            </Heading>
            <Columns.Column responsive={{ tablet: { hide: { value: true } } }}>
              <img src={team} alt="team" />
            </Columns.Column>
            <Content
              renderAs="p"
              className="is-size-4 is-size-5-mobile"
            >
            Are you ready for the future of work?<br />We connect thriving
              professionals from the digital industry with students and alumni
              of our Digital Career Program.{' '}
            </Content>
            <Content>
              <Button size="large" onClick={() => history.push('/front/signup-landing')} >
            sign-up now!
              </Button>
            </Content>
          </Columns.Column>
          <Columns.Column offset={1} responsive={{ mobile: { hide: { value: true } } }}>
            <img src={team} alt="team" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default RediHero
