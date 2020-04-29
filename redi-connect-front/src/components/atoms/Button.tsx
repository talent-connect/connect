import React from 'react'
import classnames from 'classnames'
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right.svg'
import './Button.scss'

interface Props {
  children: any
  size?: 'large' | 'medium' | 'small'
  arrow?: boolean
  fullWidth?: boolean
  disabled?: boolean
  onClick: any
  simple?: boolean
}

const Button = ({
  children,
  size = 'small',
  simple = false,
  arrow,
  fullWidth,
  onClick,
  disabled
}: Props) => {
  const baseClass = 'button'

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--fullWidth`]: fullWidth
      })}
    >
      {children}
      {arrow && <ArrowRight className="button__arrow" />}
    </button>
  )
}

export default Button
