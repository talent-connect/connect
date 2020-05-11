import React from 'react'
import classnames from 'classnames'
import { Heading as BulmaHeading } from 'react-bulma-components'
import './Heading.scss'

interface Props {
  children: any
  tag?: string
  border?: boolean
}

const Heading = ({ children, border, tag }: Props) => {
  const className = classnames({
    'title--border': border
  })

  return (
    <BulmaHeading
      size={1}
      responsive={{ mobile: { textSize: { value: 2 } } }}
      weight="normal"
      renderAs={tag || 'h1'}
      className={className}
      // spaced={true}
    >
      {children}
    </BulmaHeading>
  )
}

export default Heading
