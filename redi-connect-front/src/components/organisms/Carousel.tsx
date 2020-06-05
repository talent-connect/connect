import React from 'react';
import { Section, Container, Element, Columns, Content } from 'react-bulma-components'
import Slider from 'react-slick'
import classnames from 'classnames'
import Heading from '../atoms/Heading'
import dragos from '../../assets/images/profile-dragos.svg'
import khaled from '../../assets/images/profile-khaled.svg'
import halil from '../../assets/images/profile-halil.svg'
import './Carousel.scss'

const quotes = [
  {
    title: 'Anna, mentee and almumna of RedI School',
    text: 'A friend in React, my course, made me sign up for the mentoring program, this is how I met Khaled. He was my mentor for a year. (so grateful to her and to Khaled!) ... last year I started an internship and I now work as a frontend developer.',
    img: khaled
  },
  {
    title: 'Dragos Nedelcu, Mentor at RedI School & Software Developer',
    text: 'I first came in touch with mentoring as a mentee. It was not until I joined the Mentorship Program at RedI School in Berlin that I became a mentor myself. I believe mentoring is crucial and critical to individual and organizational success.',
    img: dragos
  },
  {
    title: 'Halil Esmer, student of the Digital Career Program, Berlin',
    text: 'I joined the mentorship program in 2019. My mentor gave me important incentives how I can start a career in IT. He showed me how a recruiter would look at my application and how to create specific applications for each position I apply for.',
    img: halil
  }
]

interface Props {
  headline: string
  title: string
  border: 'blue' | 'orange'
}

const Carousel = ({ headline, title, border }: Props) => {
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
          className="double-block-space"
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
                  <img src={quote.img} className={classnames('carousel__image-border', { [`carousel__image-border--${border}`]: border })} />
                </Columns.Column>
                <Columns.Column size={6}>
                  <Element
                    textSize={6}
                    renderAs="h4"
                    textTransform="uppercase"
                    className="decoration decoration--bottomLeft double-block-space"
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
                    className="double-block-space"
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