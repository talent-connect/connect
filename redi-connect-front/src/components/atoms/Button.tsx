import React from 'react'
import classnames from 'classnames'
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right.svg'
import { ReactComponent as Hamburger } from '../../assets/images/hamburger.svg'
import { ReactComponent as Account } from '../../assets/images/account.svg'
import './Button.scss'

const Icons = {
  arrowRight: ArrowRight,
  account: Account,
  hamburger: Hamburger
}

interface Props {
  children: any
  size?: 'large' | 'medium' | 'small'
  arrow?: boolean
  fullWidth?: boolean
  disabled?: boolean
  separator?: boolean
  onClick: any
  simple?: boolean
  icon?: 'arrowRight' | 'hamburger' | 'account'
}

const Button = ({
  children,
  icon,
  size = 'small',
  simple = false,
  fullWidth,
  onClick,
  separator,
  disabled
}: Props) => {
  const baseClass = 'button'

  const Icon = icon ? Icons[icon] : undefined

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--fullWidth`]: fullWidth,
        [`${baseClass}--separator`]: separator
      })}
    >
      {children}
      {Icon &&
        <Icon className={classnames('button__icon', {
          'button__icon--spaceLeft': children
        })}/>
      }
    </button>
  )
}

export default Button
