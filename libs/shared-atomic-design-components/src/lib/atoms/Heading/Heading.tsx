import { FC } from 'react'
import classnames from 'classnames'
import { Heading as BulmaHeading } from 'react-bulma-components'
import './Heading.scss'
import { HeadingProps, sizes } from './Heading.props';

const Heading: FC<HeadingProps> = ({
  children,
  border,
  center,
  subtitle,
  className,
  tag = 'h1',
  size = 'large',
}) => {
  const classNames = classnames({
    [`decoration decoration--${border}`]: border,
    'oneandhalf-bs': border === 'bottomLeft',
    [`${className}`]: className,
  })

  return (
    <BulmaHeading
      size={sizes[size].desktop}
      responsive={{
        mobile: { textSize: { value: sizes[size].mobile } },
      }}
      weight="normal"
      textAlignment={center ? 'centered' : null}
      renderAs={tag}
      className={classNames}
      subtitle={subtitle}
    >
      {children}
    </BulmaHeading>
  )
}

export default Heading
