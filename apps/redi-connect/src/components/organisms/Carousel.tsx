import React from 'react'
import {
  Section,
  Container,
  Element,
  Columns,
  Content,
  Image,
} from 'react-bulma-components'
import DecoratedHeadline from '../atoms/DecoratedHeadline'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import Slider from 'react-slick'
import khaled from '../../assets/images/profile-khaled.jpg'
import halil from '../../assets/images/profile-halil.jpg'
import dragos from '../../assets/images/profile-dragos.jpg'
import './Carousel.scss'

interface Props {
  headline: string
  title: string
  border: 'blue' | 'orange'
}

const Carousel = ({ headline, title, border }: Props) => {
  const { t } = useTranslation()

  const quotes = [
    {
      title: t('loggedOutArea.homePage.carousel.quotes.quoteKhaled.title'),
      text: t('loggedOutArea.homePage.carousel.quotes.quoteKhaled.text'),
      img: khaled,
    },
    {
      title: t('loggedOutArea.homePage.carousel.quotes.quoteDragos.title'),
      text: t('loggedOutArea.homePage.carousel.quotes.quoteDragos.text'),
      img: dragos,
    },
    {
      title: t('loggedOutArea.homePage.carousel.quotes.quoteHalil.title'),
      text: t('loggedOutArea.homePage.carousel.quotes.quoteHalil.text'),
      img: halil,
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  }

  return (
    <Section className="default-background">
      <Container>
        <DecoratedHeadline title={title} headline={headline} />
        <Slider {...settings}>
          {quotes.map((quote: any) => {
            return (
              <div className="carousel" key={quote.img}>
                <Columns vCentered>
                  <Columns.Column size={6}>
                    <Image
                      src={quote.img}
                      alt={quote.title}
                      className={classnames('carousel__image', {
                        [`carousel__image--border-${border}`]: border,
                      })}
                    />
                  </Columns.Column>
                  <Columns.Column size={6}>
                    <Element
                      textSize={6}
                      renderAs="h4"
                      textTransform="uppercase"
                      className="decoration decoration--bottomLeft oneandhalf-bs"
                      responsive={{ mobile: { hide: { value: true } } }}
                    >
                      {quote.title}
                    </Element>
                    <Content
                      renderAs="p"
                      textSize={4}
                      responsive={{ mobile: { textSize: { value: 5 } } }}
                    >
                      {quote.text}
                    </Content>
                    <Element
                      textSize={7}
                      renderAs="h4"
                      textTransform="uppercase"
                      className="oneandhalf-bs"
                      responsive={{ desktop: { hide: { value: true } } }}
                    >
                      {quote.title}
                    </Element>
                  </Columns.Column>
                </Columns>
              </div>
            )
          })}
        </Slider>
      </Container>
    </Section>
  )
}

export default Carousel
