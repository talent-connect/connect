import React from 'react'
import { Element, Columns, Container, Section } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import { ReactComponent as RediSchool } from '../../assets/images/redi-school-logo.svg'
import { ReactComponent as Deloitte } from '../../assets/images/deloitte.svg'
import SocialMediaIcons from '../atoms/MediaIcons'
import './Footer.scss'

const RediFooter = () => {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  const supportLinks: Array<{ url: string, name: string }> =
    t('footer.supportLinks', { returnObjects: true })

  const legalLinks: Array<{ url: string, name: string }> =
    t('footer.legalLinks', { returnObjects: true })

  return (
    <footer className="footer footer__border">
      <Section>
        <Container>
          <Columns breakpoint="mobile">
            <Columns.Column mobile={{ size: 'full' }}>
              <Element renderAs="a" href="https://www.redi-school.org" target="_blank">
                <RediSchool className="oneandhalf-bs footer__link" />
              </Element>
              <Element renderAs="a" href="https://www2.deloitte.com/" target="_blank">
                <Deloitte className="footer__link"/>
              </Element>
            </Columns.Column>
            <Columns.Column mobile={{ offset: 'zero', size: 'half' }} desktop={{ offset: 1 }} className="double-bs">
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
                {supportLinks.map(link => (
                  <Element renderAs="li" textSize={6} textTransform="uppercase">
                    <Element renderAs="a" href={link.url} target="_blank" className="footer__link">
                      {link.name}
                    </Element>
                  </Element>
                ))}
              </Element>
            </Columns.Column>
            <Columns.Column mobile={{ size: 'half' }}>
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
                {legalLinks.map(link => (
                  <Element renderAs="li" textSize={6} textTransform="uppercase">
                    <Element renderAs="a" href={link.url} target="_blank" className="footer__link">
                      {link.name}
                    </Element>
                  </Element>
                ))}
              </Element>
            </Columns.Column>
            <Columns.Column>
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
          <Element size={6} className="footer__border footer__border--copyright" renderAs="p">
            &copy; {year} {t('footer.name')}
          </Element>
        </Container>
      </Section>
    </footer>
  )
}

export default RediFooter
