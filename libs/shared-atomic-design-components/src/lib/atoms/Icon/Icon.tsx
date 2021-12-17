import { FunctionComponent } from 'react'
import classnames from 'classnames'

import './Icon.scss'
import { IconProps, Icons } from './Icon.props';

const Icon: FunctionComponent<IconProps> = ({
  icon,
  space,
  size,
  className,
  onClick,
  style = {},
}) => {
  const Icon = icon ? Icons[icon] : undefined

  const iconSize = size || 'medium'

  return Icon ? (
    <Icon
      className={classnames('icon', {
        [`icon--space-${space}`]: space,
        [`icon--${iconSize}`]: iconSize,
        'icon--active': onClick,
        [`${className}`]: className,
      })}
      onClick={onClick}
      style={style}
    />
  ) : null
}

export default Icon
