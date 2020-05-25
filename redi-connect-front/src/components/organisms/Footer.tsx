import React from 'react'
import { Columns, Container, Section } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Icons from '../atoms/MediaIcons'
import './Footer.scss'

const RediFooter = () => {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <Section>
        <Container>
          <Columns>
            <Columns.Column className="is-hidden-mobile">
              <p>
                <a href="https://www.redi-school.org/">{t('footer.name')}</a>
              </p>
              <p>&copy; {year} {t('footer.copyright')}</p>
            </Columns.Column>
            <Columns.Column className="is-hidden-tablet footer--headline">
              <p className="is-size-5">{t('footer.socialMediaHeadline')}</p>
              <Icons />
            </Columns.Column>
            <Columns.Column className="footer--links">
              <p>
                <a
                  href="https://www.redi-school.org/imprint"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.contact')}
                </a>
              </p>
              <p>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  {t('footer.faq')}
                </a>
              </p>
              <p>
                <a
                  href="https://www.redi-school.org/berlin-transparency/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.transparency')}
                </a>
              </p>
              <p>
                <a href="/">{t('footer.cookies')}</a>
              </p>
              <p>
                <a
                  href="https://www.redi-school.org/data-privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.dataPolicy')}
                </a>
              </p>
            </Columns.Column>
            <Columns.Column className="is-hidden-mobile is-narrow footer--headline">
              <p>{t('footer.socialMediaHeadline')}</p>
              <Icons />
            </Columns.Column>
            <Columns.Column
              mobile={{
                size: 'four-fifths'
              }}
              className="is-hidden-tablet"
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
