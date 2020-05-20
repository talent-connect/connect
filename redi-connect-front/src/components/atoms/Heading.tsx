import React from 'react'
import classnames from 'classnames'
import { Heading as BulmaHeading } from 'react-bulma-components'
import './Heading.scss'

interface Props {
  children: any
  size?: 'large' | 'small'
  tag?: string
  border?: 'topCenter' | 'bottomLeft'
  center?: boolean
}

const sizes = {
  large: {
    desktop: 1,
    mobile: 2
  },
  small: {
    desktop: 2,
    mobile: 4
  }
}

const Heading = ({ children, border, tag, size, center }: Props) => {
  const className = classnames({
    [`decoration decoration--${border}`]: border,
    'double-block-space': border === 'bottomLeft'
  })

  const currentSize = size || 'large'

  return (
    <BulmaHeading
      size={ sizes[currentSize].desktop }
      responsive={{ mobile: { textSize: { value: sizes[currentSize].mobile } } }}
      weight="normal"
      textAlignment={center ? 'centered' : null}
      renderAs={tag || 'h1'}
      className={className}
      // spaced={true}
    >
      {children}
    </BulmaHeading>
  )
}

export default Heading
