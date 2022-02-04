import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Element, Columns, Container, Section } from 'react-bulma-components'
import { ReactComponent as RediSchool } from '../../assets/images/redi-school-logo.svg'
import { ReactComponent as Deloitte } from '../../assets/images/deloitte.svg'
import './Footer.scss'
import { SocialMediaIcons } from '@talent-connect/shared-atomic-design-components'

type Link = {
  url: string;
  name: string;
}

const RediFooter: FC = () => {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  const supportLinks: Link[] = t('footer.supportLinks', { returnObjects: true })

  const legalLinks: Link[] = t('footer.legalLinks', { returnObjects: true })

  return (
    <footer className="footer">
      <Section>
        <Container>
          <Columns breakpoint="mobile">
            <Columns.Column mobile={{ size: 12 }}>
              <Element
                renderAs="a"
                href="https://www.redi-school.org"
                target="_blank"
                className="footer__logo oneandhalf-bs"
              >
                <RediSchool />
              </Element>
              <Element
                renderAs="a"
                href="https://www2.deloitte.com/"
                target="_blank"
                className="footer__logo"
              >
                <Deloitte />
              </Element>
            </Columns.Column>
            <Columns.Column
              mobile={{ offset: null, size: 6 }}
              desktop={{ offset: 1 }}
              className="double-bs"
            >
              <Element
                renderAs="h3"
                textSize={6}
                textWeight="bold"
                textTransform="uppercase"
                className="footer__headline"
              >
                {t('footer.support')}
              </Element>
              <Element renderAs="ul">
                {supportLinks.map(({ url, name }) => (
                  <Element renderAs="li" key={url}>
                    <Element
                      renderAs="a"
                      href={url}
                      target="_blank"
                      className="footer__link"
                    >
                      {name}
                    </Element>
                  </Element>
                ))}
              </Element>
            </Columns.Column>
            <Columns.Column mobile={{ size: 6 }}>
              <Element
                renderAs="h3"
                textSize={6}
                textWeight="bold"
                textTransform="uppercase"
                className="footer__headline"
              >
                {t('footer.legal')}
              </Element>
              <Element renderAs="ul">
                {legalLinks.map(({ url, name }) => (
                  <Element renderAs="li" key={url}>
                    <Element
                      renderAs="a"
                      href={url}
                      target="_blank"
                      className="footer__link"
                    >
                      {name}
                    </Element>
                  </Element>
                ))}
              </Element>
            </Columns.Column>
            <Columns.Column desktop={{ size: 3 }} tablet={{ size: 6 }}>
              <Element
                renderAs="h3"
                textSize={6}
                textWeight="bold"
                textTransform="uppercase"
                className="footer__headline"
              >
                {t('footer.socialMediaHeadline')}
              </Element>
              <SocialMediaIcons />
            </Columns.Column>
          </Columns>
          <Element size={6} className="footer__copyright" renderAs="p">
            &copy; {year} {t('footer.name')}
          </Element>
        </Container>
      </Section>
    </footer>
  )
}

export default RediFooter
