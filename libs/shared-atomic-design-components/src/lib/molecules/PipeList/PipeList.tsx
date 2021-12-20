import { FunctionComponent } from 'react'
import { Element } from 'react-bulma-components'
import './PipeList.scss'

interface Props {
  items: string[]
  overflowAllowed?: true
}

const PipeList: FunctionComponent<Props> = ({ items, overflowAllowed }) => {
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
