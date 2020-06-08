import React from 'react'
import { Columns, Container, Section, Element } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Icons from '../atoms/MediaIcons'
import './Footer.scss'

const RediFooter = () => {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  const links = [
    {
      name: t('footer.contact'),
      url: 'https://www.redi-school.org/imprint'
    },
    {
      name: t('footer.faq'),
      url: '/'
    },
    {
      name: t('footer.transparency'),
      url: 'https://www.redi-school.org/berlin-transparency/'
    },
    {
      name: t('footer.cookies'),
      url: '/'
    },
    {
      name: t('footer.dataPolicy'),
      url: 'https://www.redi-school.org/data-privacy-policy'
    }
  ]

  return (
    <footer className="footer">
      <Section>
        <Container>
          <Columns>
            <Columns.Column responsive={{ mobile: { hide: { value: true } } }}>
              <Element
                renderAs="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.redi-school.org/"
              >
                {t('footer.name')}
              </Element>
              <Element renderAs="p">&copy; {year} {t('footer.copyright')}</Element>
            </Columns.Column>
            <Columns.Column
              responsive={{ tablet: { hide: { value: true } } }}
              className="footer--headline"
            >
              <Element renderAs="p" textSize={5}>{t('footer.socialMediaHeadline')}</Element>
              <Icons />
            </Columns.Column>
            <Columns.Column className="footer--links">
              {links.map(link => (
                <Element renderAs="p">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </Element>
              ))}
            </Columns.Column>
            <Columns.Column
              narrow
              className="footer--headline"
              responsive={{ mobile: { hide: { value: true } } }}
            >
              <Element renderAs="p">{t('footer.socialMediaHeadline')}</Element>
              <Icons />
            </Columns.Column>
            <Columns.Column
              mobile={{
                size: 'four-fifths'
              }}
              responsive={{ tablet: { hide: { value: true } } }}
            >
              <span>
                <a href="https://www.redi-school.org/">{t('footer.name')}</a>
              </span>
              <span className="is-pulled-right">
                &copy; {year} {t('footer.copyright')}
              </span>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </footer>
  )
}

export default RediFooter
