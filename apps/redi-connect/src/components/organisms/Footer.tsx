import { SocialMediaIcons } from '@talent-connect/shared-atomic-design-components'
import { Columns, Container, Element, Section } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import JpmLogo from '../../assets/images/Jpm-logo.png'
import DeloitteLogo from '../../assets/images/deloitte-logo.png'
import { ReactComponent as RediSchool } from '../../assets/images/redi-school-logo.svg'
import './Footer.scss'

const RediFooter = () => {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  const supportLinks: Array<{
    url: string
    name: string
  }> = t('footer.supportLinks', { returnObjects: true })

  const legalLinks: Array<{
    url: string
    name: string
    triggerCookieSettingsGlobalFunction: boolean
  }> = t('footer.legalLinks', { returnObjects: true })

  const handleCookieSettingsClick = () => {
    if (
      typeof window !== 'undefined' &&
      typeof (window as any).resetCookieConsent === 'function'
    ) {
      ;(window as any).resetCookieConsent()
    }
  }

  return (
    <footer className="footer">
      <Section>
        <Container>
          <Columns breakpoint="mobile">
            <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
              <Element
                renderAs="a"
                href="https://www.redi-school.org"
                target="_blank"
                className="footer__logo oneandhalf-bs"
              >
                <RediSchool />
              </Element>
              <Columns breakpoint="mobile">
                <Columns.Column
                  mobile={{ size: 12 }}
                  size={6}
                  tablet={{ size: 12 }}
                >
                  <Element renderAs="small" className="footer__supported">
                    In collaboration with
                  </Element>
                  <Element
                    renderAs="img"
                    src={DeloitteLogo}
                    alt="Supported by Deloitte"
                    className="footer__logo oneandhalf-bs"
                  ></Element>
                </Columns.Column>
                <Columns.Column mobile={{ size: 12 }} size={6}>
                  <Element renderAs="small" className="footer__supported">
                    In collaboration with
                  </Element>
                  <Element
                    renderAs="img"
                    src={JpmLogo}
                    alt="Supported by J.P. Morgan"
                    className="footer__logo oneandhalf-bs"
                  ></Element>
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
                {supportLinks.map((link, index) => (
                  <Element renderAs="li" key={`${link.url}-${index}`}>
                    <Element
                      renderAs="a"
                      href={link.url}
                      target="_blank"
                      className="footer__link"
                    >
                      {link.name}
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
                {legalLinks.map((link, index) => (
                  <Element renderAs="li" key={`${link.url}-${index}`}>
                    <Element
                      renderAs="a"
                      href={link.url}
                      onClick={
                        link.triggerCookieSettingsGlobalFunction
                          ? () => handleCookieSettingsClick()
                          : undefined
                      }
                      target="_blank"
                      className="footer__link"
                    >
                      {link.name}
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
