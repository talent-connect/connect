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
import { ReactComponent as Hello } from '../../assets/images/hello.svg'
import { ReactComponent as HelloMobile } from '../../assets/images/hello-mobile.svg'

import './PreFooter.scss'

const PreFooter = () => {
  const history = useHistory()

  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={4} className="is-four-fifths-mobile">
            <Heading>
              Want to get in touch?
            </Heading>
            <Content
              renderAs="p"
              className="is-size-4 is-size-5-mobile"
            >
              If you have questions or just want to say hello, please do not
              hesitate to contact us!
            </Content>
            <Content>
              <Button size="large" onClick={() => history.push('/front/signup-landing')} >
                say hello!
              </Button>
            </Content>
          </Columns.Column>
          <Columns.Column className="is-hidden-mobile">
            <Hello className="pre-footer__image" />
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet">
            <HelloMobile className="pre-footer__image" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default PreFooter
