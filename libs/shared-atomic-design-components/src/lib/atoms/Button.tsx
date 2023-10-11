import classnames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Button.scss'
import Icon from './Icon'

export interface ButtonProps {
  children: any
  className?: string
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick?: () => void
  simple?: boolean
  to?: string
  style?: React.CSSProperties
}

const Button = ({
  children,
  className,
  size = 'small',
  simple = false,
  fullWidth,
  onClick,
  separator,
  disabled,
  to,
  style = {},
}: ButtonProps) => {
  const baseClass = 'button-atom'

  if (!to) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        className={classnames(
          baseClass,
          `${baseClass}--${simple ? 'simple' : 'default'}`,
          {
            [`${baseClass}--${size}`]: size,
            [`${baseClass}--fullWidth`]: fullWidth,
            [`${baseClass}--separator`]: separator,
            [`${className}`]: className,
          }
        )}
        style={style}
      >
        {children}
        {!simple && <div className="button-after" />}
      </button>
    )
  }

  const isExternalLink = to.includes('http')

  if (isExternalLink) {
    return (
      <button
        onClick={() => (window.location.href = to)}
        type="button"
        className={classnames(
          baseClass,
          `${baseClass}--${simple ? 'simple' : 'default'}`,
          {
            [`${baseClass}--${size}`]: size,
            [`${baseClass}--fullWidth`]: fullWidth,
            [`${baseClass}--separator`]: separator,
            [`${className}`]: className,
          }
        )}
        style={style}
      >
        {children}
        {!simple && <div className="button-after" />}
      </button>
    )
  }

  return (
    <NavLink
      to={to || '/'}
      activeClassName={`${baseClass}--active`}
      className={classnames(baseClass, `${baseClass}--nav`, {
        [`${baseClass}--${size}`]: size,
      })}
      style={style}
    >
      {children}
    </NavLink>
  )
}

Button.Icon = Icon

export default Button
