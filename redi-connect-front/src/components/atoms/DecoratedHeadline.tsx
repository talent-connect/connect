import React from 'react'
import { Element } from 'react-bulma-components'
import Heading from '../atoms/Heading'
import './DecoratedHeadline.scss'

interface Props {
  title: string
  headline: string
}

const DecoratedHeadline = ({ title, headline }: Props) => {
  return (
    <>
      <Element
        renderAs="h4"
        textAlignment="centered"
        textTransform="uppercase"
        textSize={6}
        responsive={{ mobile: { textSize: { value: 7 } } }}
      >
        {title}
      </Element>
      <Heading
        center
        size="medium"
        border="topCenter"
        className="decorated-headline"
      >
        {headline}
      </Heading>
    </>
  )
}

export default DecoratedHeadline
