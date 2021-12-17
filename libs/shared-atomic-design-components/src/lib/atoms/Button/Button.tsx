import { FunctionComponent } from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'
import { ButtonProps } from './Button.props';
import './Button.scss'

const Button: FunctionComponent<ButtonProps> & { Icon: typeof Icon } = ({
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
}) => {
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
