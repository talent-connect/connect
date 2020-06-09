import React from 'react';
import { Section, Container, Element, Columns, Content } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import classnames from 'classnames'
import Heading from '../atoms/Heading'
import dragos from '../../assets/images/profile-dragos.svg'
import khaled from '../../assets/images/profile-khaled.svg'
import halil from '../../assets/images/profile-halil.svg'
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
      img: khaled
    },
    {
      title: t('loggedOutArea.homePage.carousel.quotes.quoteDragos.title'),
      text: t('loggedOutArea.homePage.carousel.quotes.quoteDragos.text'),
      img: dragos
    },
    {
      title: t('loggedOutArea.homePage.carousel.quotes.quoteHalil.title'),
      text: t('loggedOutArea.homePage.carousel.quotes.quoteHalil.text'),
      img: halil
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    pauseOnHover: true,
  };

  return (
    <Section className="default-background">
      <Container>
        <Element
          textTransform="uppercase"
          textSize={6}
          textAlignment="centered"
          responsive={{ mobile: { textSize: { value: 7 } } }}
          renderAs="h4"
        >
          {title}
        </Element>
        <Heading
          center
          size="medium"
          border="topCenter"
          className="oneandhalf-bs"
        >
          {headline}
        </Heading>
      </Container>
      <Container>
        <Slider {...settings}>
          {quotes.map(quote => (
            <div className="carousel">
              <Columns key={quote.img} vCentered>
                <Columns.Column size={6}>
                  <img src={quote.img} className={classnames('carousel__image', {
                    [`carousel__image--border-${border}`]: border
                  })} />
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
          ))}
        </Slider>
      </Container>
    </Section>
  );
};

export default Carousel;