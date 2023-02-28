import { Element } from 'react-bulma-components'
import './PipeList.scss'

interface Props {
  items: string[]
  overflowAllowed?: true
}

const PipeList = ({ items, overflowAllowed }: Props) => {
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
