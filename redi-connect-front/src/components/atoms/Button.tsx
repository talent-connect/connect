import React from 'react'
import classnames from 'classnames'
import Icon from './Icon'
import './Button.scss'

interface Props {
  children: any
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick: () => void
  simple?: boolean
}

const Button = ({
  children,
  size = 'small',
  simple = false,
  fullWidth,
  onClick,
  separator,
  disabled
}: Props) => {
  const baseClass = 'button'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--fullWidth`]: fullWidth,
        [`${baseClass}--separator`]: separator
      })}
    >
      {children}
    </button>
  )
}

Button.Icon = Icon

export default Button
