import React from 'react'
import {
  Container,
  Section,
  Columns,
  Content
} from 'react-bulma-components'
import Heading from '../atoms/Heading'
import { useTranslation } from 'react-i18next'
import Button from '../atoms/Button'
import SVGImage from '../atoms/SVGImage'

import './PreFooter.scss'

const PreFooter = () => {
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={4}>
            <Heading>
              {t('preFooter.headline')}
            </Heading>
            <Content
              renderAs="p"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="oneandhalf-bs"
            >
              {t('preFooter.content')}
            </Content>
            <Content>
              <Button size="large" onClick={() => (window.location.href = 'mailto:career@redi-school.org')}>
                {t('button.sayHello')}
              </Button>
            </Content>
          </Columns.Column>
          <Columns.Column className="is-hidden-mobile">
            <SVGImage image="hello" className="pre-footer__image" />
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet">
            <SVGImage image="helloMobile" className="pre-footer__image" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default PreFooter
