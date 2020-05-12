import React from 'react'
import {
  Container,
  Section,
  Columns,
  Heading,
  Content
} from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import Button from '../atoms/Button'
import team from '../../assets/images/hero.svg'
import './RediHero.scss'

const RediHero = () => {
  const history = useHistory()
  return (
    <Section className="hero">
      <Container>
        <Columns>
          <Columns.Column size={5} className="hero-column">
            <Heading size={1} className="hero-column-heading">
            Welcome to ReDI Connect
            </Heading>
            <Columns.Column className="is-hidden-tablet">
              <img src={team} alt="team" className="hero-column-img" />
            </Columns.Column>
            <Content className="hero-column-content">
            Are you ready for the future of work?<br />We connect thriving
              professionals from the digital industry with students and alumni
              of our Digital Career Program.{' '}
            </Content>
            <Button size="large" onClick={() => history.push('/front/signup-landing')} >
            sign-up now!
            </Button>
          </Columns.Column>
          <Columns.Column offset={1} className="is-hidden-mobile">
            <img src={team} alt="team" className="hero-column-img" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default RediHero
