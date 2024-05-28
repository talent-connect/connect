import {
  Heading,
  SVGImage,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Container, Content, Section } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'

import './PreFooter.scss'

const PreFooter = () => {
  const { t } = useTranslation()

  return (
    <Section className="default-background">
      <Container>
        <Columns vCentered>
          <Columns.Column size={4}>
            <Heading>{t('preFooter.headline')}</Heading>
            <Content
              renderAs="div"
              textSize={4}
              responsive={{ mobile: { textSize: { value: 5 } } }}
              className="pre-footer__content"
              dangerouslySetInnerHTML={{
                __html: `${t('preFooter.content')}`,
              }}
            />
            {/* Hide button until we implement the new Contact Us page */}
            {/* <Button
              size="large"
              onClick={() =>
                (window.location.href = 'mailto:career@redi-school.org')
              }
            >
              {t('button.sayHello')}
            </Button> */}
          </Columns.Column>
          <Columns.Column>
            <SVGImage image="hello" className="pre-footer__image" />
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default PreFooter
