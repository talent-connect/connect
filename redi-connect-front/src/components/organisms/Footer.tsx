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

  const supportLinks = [
    {
      url: 'https://connect.redi-school.org/downloadeables/redi-connect-code-of-conduct.pdf',
      name: t('footer.faq')
    },
    {
      url: 'mailto:career@redi-school.org',
      name: t('footer.contact')
    },
    {
      url: 'https://www.redi-school.org',
      name: t('footer.name')
    }
  ]

  const legalLinks = [
    {
      url: 'https://www.redi-school.org/berlin-transparency/',
      name: t('footer.transparency')
    },
    {
      url: 'https://www.redi-school.org/imprint/',
      name: t('footer.cookies')
    },
    {
      url: 'https://www.redi-school.org/data-privacy-policy',
      name: t('footer.privacy')
    }
  ]

  return (
    <footer className="footer footer--border">
      <Section>
        <Container>
          <Columns breakpoint="mobile">
            <Columns.Column mobile={{ size: 'full' }}>
              <Element renderAs="a" href="https://www.redi-school.org" target="_blank">
                <RediSchool className="oneandhalf-bs" />
              </Element>
              <Element renderAs="a" href="https://www.deloitte.de" target="_blank">
                <Deloitte />
              </Element>
            </Columns.Column>
            <Columns.Column mobile={{ offset: 'zero', size: 'half' }} desktop={{ offset: 1 }} className="double-bs">
              <Element renderAs="ul">
                <Element renderAs="li" textSize={6} textTransform="uppercase" textWeight="bold">
                  {t('footer.support')}
                </Element>
                <Element renderAs="hr"/>
                {supportLinks.map(link => (
                  <Element renderAs="li" textSize={6} textTransform="uppercase">
                    <Element renderAs="a" href={link.url} target="_blank">
                      {link.name}
                    </Element>
                  </Element>
                ))}
              </Element>
            </Columns.Column>
            <Columns.Column mobile={{ size: 'half' }}>
              <Element renderAs="ul">
                <Element renderAs="li" textSize={6} textTransform="uppercase" textWeight="bold">
                  {t('footer.legal')}
                  <Element renderAs="hr" />
                </Element>
                {legalLinks.map(link => (
                  <Element renderAs="li" textSize={6} textTransform="uppercase">
                    <Element renderAs="a" href={link.url} target="_blank">
                      {link.name}
                    </Element>
                  </Element>
                ))}
              </Element>
            </Columns.Column>
            <Columns.Column>
              <Element renderAs="ul">
                <Element renderAs="li" textSize={6} textTransform="uppercase" textWeight="bold">
                  {t('footer.socialMediaHeadline')}
                </Element>
                <Element renderAs="hr" />
                <SocialMediaIcons />
              </Element>
            </Columns.Column>
          </Columns>
          <Element size={6} className="footer--border" renderAs="p">
            &copy; {year} {t('footer.name')}
          </Element>
        </Container>
      </Section>
    </footer>
  )
}

export default RediFooter
