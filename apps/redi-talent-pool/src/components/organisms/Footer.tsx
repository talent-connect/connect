import { SocialMediaIcons } from '@talent-connect/shared-atomic-design-components'
import { FC } from 'react'
import { Columns, Container, Element, Section } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import { ReactComponent as RediSchool } from '../../assets/redi-school-logo.svg'
import MicrosoftLogo from '../../assets/images/microsoft-logo.png'
import DeloitteLogo from '../../assets/images/deloitte-logo.png'
import './Footer.scss'

type Link = {
  url: string;
  name: string;
}

const RediFooter() {
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
              <Columns breakpoint="mobile">
                <Columns.Column>
                  <Element renderAs="small">Supported by</Element>
                  <Element
                    renderAs="a"
                    href="https://www.microsoft.com/de-de/berlin/corporate-digital-responsibility.aspx?id=tab01"
                    target="_blank"
                    className="footer__logo oneandhalf-bs"
                    style={{ marginTop: 0 }}
                  >
                    <img
                      src={MicrosoftLogo}
                      alt="Supported by Microsoft"
                      style={{ maxWidth: '6rem' }}
                    />
                  </Element>
                </Columns.Column>
                <Columns.Column>
                  <Element renderAs="small">Supported by</Element>
                  <Element
                    renderAs="a"
                    href=""
                    target="_blank"
                    className="footer__logo oneandhalf-bs"
                    style={{ marginTop: 0 }}
                  >
                    <img
                      src={DeloitteLogo}
                      alt="Supported by Deloitte"
                      style={{ maxWidth: '6rem' }}
                    />
                  </Element>
                </Columns.Column>
              </Columns>
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
            <Columns.Column tablet={{ size: 2 }}>
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
