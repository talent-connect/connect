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
import { ReactComponent as Hello } from '../../assets/images/hello.svg'
import { ReactComponent as HelloMobile } from '../../assets/images/hello-mobile.svg'

import './PreFooter.scss'

const PreFooter = () => {
  const history = useHistory()

  return (
    <Section className="pre-footer">
      <Container>
        <Columns>
          <Columns.Column size={4} className="is-four-fifths-mobile">
            <Heading size={1} className="pre-footer-heading has-text-black">
              Want to get in touch?
            </Heading>
            <Content className="pre-footer-content">
              If you have questions or just want to say hello, please do not
              hesitate to contact us!
            </Content>
            <Columns>
              <Columns.Column className="is-four-fifths-mobile">
                <Button size="large" onClick={() => history.push('/front/login')}>
                  say hello!
                </Button>
              </Columns.Column>
            </Columns>
          </Columns.Column>
          <Columns.Column className="is-hidden-mobile">
            <Hello className="pre-footer-image" />
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet">
            <HelloMobile className="pre-footer-image" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default PreFooter
