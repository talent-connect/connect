import React from 'react'
import { Element, Columns, Container, Section, Heading } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import { ReactComponent as RediSchool } from '../../assets/images/redi-school-logo.svg'
import { ReactComponent as Deloitte } from '../../assets/images/deloitte.svg'
import Icons from '../atoms/MediaIcons'
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
              <Element>
                <RediSchool className="oneandhalf-bs" />
              </Element>
              <Element>
                <Deloitte />
              </Element>
            </Columns.Column>
            <Columns.Column mobile={{ offset: 'zero', size: 'half' }} desktop={{ offset: 1 }} className="double-bs">
              <Heading subtitle size={6} textTransform="uppercase" textWeight="bold">
                {t('footer.support')}
              </Heading>
              <Element renderAs="hr"/>
              {supportLinks.map(link => (
                <Heading subtitle size={6} textTransform="uppercase">
                  <Element renderAs="a" href={link.url} target="_blank">
                    {link.name}
                  </Element>
                </Heading>
              ))}
            </Columns.Column>
            <Columns.Column mobile={{ size: 'half' }}>
              <Heading subtitle size={6} textTransform="uppercase" textWeight="bold">
                {t('footer.legal')}
              </Heading>
              <Element renderAs="hr" />
              {legalLinks.map(link => (
                <Heading subtitle size={6} textTransform="uppercase">
                  <Element renderAs="a" href={link.url} target="_blank">
                    {link.name}
                  </Element>
                </Heading>
              ))}
            </Columns.Column>
            <Columns.Column>
              <Heading subtitle size={6} textTransform="uppercase" textWeight="bold">
                {t('footer.socialMediaHeadline')}
              </Heading>
              <Element renderAs="hr" />
              <Icons />
            </Columns.Column>
          </Columns>
          <Heading size={6} subtitle className="footer--border" renderAs="p">
            &copy; {year} {t('footer.name')}
          </Heading>
        </Container>
      </Section>
    </footer>
  )
}

export default RediFooter
