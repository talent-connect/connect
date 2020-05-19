import React from 'react'
import classnames from 'classnames'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg'
import './Button.scss'

interface Props {
  children: any
  size?: 'large' | 'medium' | 'small'
  arrow?: boolean
  fullWidth?: boolean
  disabled?: boolean
  onClick: any
  simple?: boolean
  color?: 'orangeDark'
}

const Button = ({
  children,
  size = 'small',
  simple = false,
  arrow,
  fullWidth,
  onClick,
  disabled,
  color
}: Props) => {
  const baseClass = 'button'

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--fullWidth`]: fullWidth,
        [`${baseClass}--${color}`]: color
      })}
    >
      {arrow && <ArrowLeft className="button__arrow" />}
      {children}
    </button>
  )
}

export default Button
