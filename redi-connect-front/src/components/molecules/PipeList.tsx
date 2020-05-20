import React from 'react'
import { Element } from 'react-bulma-components'
import './PipeList.scss'

interface Props {
  items: string[]
}

const PipList = ({ items }: Props) => {
  return (
    <Element renderAs="ul" className="pipe-list">
      {items.map((language: any, index: number) => <Element renderAs="li" key={`${language}_${index}`}>{language}</Element>)}
    </Element>
  )
}

export default PipList
