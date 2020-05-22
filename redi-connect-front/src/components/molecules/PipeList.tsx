import React from 'react'
import { Element } from 'react-bulma-components'
import './PipeList.scss'

interface Props {
  items: string[]
}

const PipList = ({ items }: Props) => {
  return (
    <Element renderAs="ul" className="pipe-list">
      {items.map((item) => <Element renderAs="li" key={item}>{item}</Element>)}
    </Element>
  )
}

export default PipList
