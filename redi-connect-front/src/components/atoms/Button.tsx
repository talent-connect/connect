import React from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import './Button.scss'

const baseClass = 'button'

interface Props {
  children: any
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick: () => void
  simple?: boolean
}

interface NavProps {
  children: any
  to: string
  size?: 'large' | 'medium' | 'small'
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

Button.Nav = ({
  children,
  to,
  size = 'small'
}: NavProps) => {
  return (
    <NavLink
      to={to !== undefined ? to : '/'}
      activeClassName={`${baseClass}__nav--active`}
      className={classnames(baseClass, `${baseClass}__nav`, {
        [`${baseClass}--${size}`]: size
      })}>
      {children}
    </NavLink>
  )
}

Button.Icon = Icon

export default Button
