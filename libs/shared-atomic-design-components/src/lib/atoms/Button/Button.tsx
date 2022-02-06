import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'
import { ButtonProps } from './Button.props';
import './Button.scss'

const baseClass = 'button-atom'

function Button ({
  children,
  className,
  fullWidth,
  onClick,
  separator,
  disabled,
  to,
  size = 'small',
  simple = false,
  style = {},
}: ButtonProps) {

  const classNames = classnames(
    baseClass,
    `${baseClass}--${simple ? 'simple' : 'default'}`,
    {
      [`${baseClass}--${size}`]: size,
      [`${baseClass}--fullWidth`]: fullWidth,
      [`${baseClass}--separator`]: separator,
      [`${className}`]: className,
    })

  if (!to) return (
    <button
      type="button"
      {...{ classNames, style, disabled, onClick }}
    >
      {children}
    </button>
  )

  const isExternalLink = to.includes('http')

  if (isExternalLink) return (
    <button
      type="button"
      {...{ classNames, style }}
      onClick={() => (window.location.href = to)}
    >
      {children}
    </button>
  )

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
