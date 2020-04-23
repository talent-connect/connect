import React from 'react'
import {
  Container,
  Section,
  Columns,
  Heading,
  Content,
  Image
} from 'react-bulma-components'
import Button from '../atoms/Button'
import hello from '../../assets/images/hello.svg'
// import helloMobile from "../../assets/images/hello-mobile.svg";
import './PreFooter.scss'

const PreFooter = () => (
  <Section className="pre-footer-container">
    <Container>
      <Columns>
        <Columns.Column className="one-thirds is-four-fifths-mobile">
          <Heading size={1} className="pre-footer-heading">
            Want to get in touch?
          </Heading>
          <Content className="pre-footer-content">
            If you have questions or just want to say hello, please do not
            hesitate to contact us!
          </Content>
          <Columns>
            <Columns.Column className="is-two-thirds-mobile">
              <Button size="large" text="say hello!" />
            </Columns.Column>
          </Columns>
        </Columns.Column>
        <Columns.Column className="is-hidden-mobile">
          <Image src={hello} alt="hello" className="pre-footer-image" />
        </Columns.Column>
        <Columns.Column className="is-hidden-tablet">
          <Image src={hello} alt="hello" />
        </Columns.Column>
      </Columns>
    </Container>
  </Section>
)

export default PreFooter
