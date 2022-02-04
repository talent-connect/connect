import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Section, Container, Element } from 'react-bulma-components'
import { DecoratedHeadline } from '@talent-connect/shared-atomic-design-components'
import './Checklist.scss'
interface Props {
  type: 'mentor' | 'mentee'
}

const Checklist: FC<Props> = ({ type }) => {
  const { t } = useTranslation()

  const checklist: {
    content: string
    headline: string
    image: any
  }[] = t(`loggedOutArea.homePage.checklist.${type}.items`, { returnObjects: true })

  return (
    <Section className="default-background">
      <Container>
        <DecoratedHeadline
          title={t(`loggedOutArea.homePage.checklist.${type}.title`)}
          headline={t(`loggedOutArea.homePage.checklist.${type}.headline`)}
        />
        <Element renderAs="ul" className="checklist">
          {checklist.map((item) => (
            <Element
              key={item}
              textSize={4}
              renderAs="li"
              className="checklist__item"
              responsive={{ mobile: { textSize: { value: 5 } } }}
            >
              {item}
            </Element>
          ))}
        </Element>
      </Container>
    </Section>
  )
}

export default Checklist
