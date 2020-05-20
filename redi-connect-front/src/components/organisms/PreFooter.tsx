import React from 'react'
import {
  Container,
  Section,
  Columns,
  Content
} from 'react-bulma-components'
import Heading from '../atoms/Heading'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../atoms/Button'
import { ReactComponent as Hello } from '../../assets/images/hello.svg'
import { ReactComponent as HelloMobile } from '../../assets/images/hello-mobile.svg'

import './PreFooter.scss'

const PreFooter = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={4} className="is-four-fifths-mobile">
            <Heading>
              {t('preFooter.headline')}
            </Heading>
            <Content
              renderAs="p"
              className="is-size-4 is-size-5-mobile double-block-space"
            >
              {t('preFooter.content')}
            </Content>
            <Content>
              <Button size="large" onClick={() => history.push('/front/signup-landing')} >
                {t('button.sayHello')}
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
