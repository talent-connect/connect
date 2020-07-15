import React from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import './Button.scss'

interface Props {
  children: any
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick?: () => void
  simple?: boolean
  to?: string
  color?: 'orange' | 'blue'
}

const Button = ({
  children,
  size = 'small',
  simple = false,
  fullWidth,
  onClick,
  separator,
  disabled,
  to,
  color
}: Props) => {
  const baseClass = 'button'

  const button = (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--fullWidth`]: fullWidth,
        [`${baseClass}--separator`]: separator,
        [`${baseClass}--color ${baseClass}--${color}`]: color
      })}
    >
      {children}
    </button>
  )

  const navLink = (
    <NavLink
      to={to || '/'}
      activeClassName={`${baseClass}--active`}
      className={classnames(baseClass, `${baseClass}--nav`, {
        [`${baseClass}--${size}`]: size
      })}>
      {children}
    </NavLink>
  )

  return to ? navLink : button
}

Button.Icon = Icon

export default Button
