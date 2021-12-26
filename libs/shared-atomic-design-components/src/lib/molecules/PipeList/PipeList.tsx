import { FC } from 'react'
import { Element } from 'react-bulma-components'
import { PipeListProps } from './PipeList.props';
import './PipeList.scss'


const PipeList: FC<PipeListProps> = ({ items, overflowAllowed }) => {
  return (
    <Element
      renderAs="ul"
      className={`pipe-list ${
        !overflowAllowed ? 'pipe-list--overflow-ellipsis' : ''
      }`}
    >
      {items.map((item) => (
        <Element renderAs="li" key={item}>
          {item}
        </Element>
      ))}
    </Element>
  )
}

export default PipeList
