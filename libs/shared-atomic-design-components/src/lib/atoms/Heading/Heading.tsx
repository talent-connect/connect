import React from 'react'
import classnames from 'classnames'
import { Heading as BulmaHeading } from 'react-bulma-components'
import './Heading.scss'

export interface HeadingProps {
  children: React.ReactNode
  className?: string
  size?: 'large' | 'medium' | 'small' | 'smaller'
  tag?: string
  border?: 'topCenter' | 'bottomLeft'
  center?: boolean
  subtitle?: boolean
}

const sizes = {
  large: {
    desktop: 1,
    mobile: 2,
  },
  medium: {
    desktop: 2,
    mobile: 4,
  },
  small: {
    desktop: 3,
    mobile: 4,
  },
  smaller: {
    desktop: 4,
    mobile: 5,
  },
}

const Heading = ({
  children,
  border,
  tag,
  size,
  center,
  subtitle,
  className,
}: HeadingProps) => {
  const classNames = classnames({
    [`decoration decoration--${border}`]: border,
    'oneandhalf-bs': border === 'bottomLeft',
    [`${className}`]: className,
  })

  const currentSize = size || 'large'

  return (
    <BulmaHeading
      size={sizes[currentSize].desktop}
      responsive={{
        mobile: { textSize: { value: sizes[currentSize].mobile } },
      }}
      weight="normal"
      textAlignment={center ? 'centered' : null}
      renderAs={tag || 'h1'}
      className={classNames}
      subtitle={subtitle}
    >
      {children}
    </BulmaHeading>
  )
}

export default Heading
