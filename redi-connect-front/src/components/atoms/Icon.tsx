import React from 'react'
import classnames from 'classnames'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg'
import { ReactComponent as Hamburger } from '../../assets/images/hamburger.svg'
import { ReactComponent as Account } from '../../assets/images/account.svg'
import { ReactComponent as Checkmark } from '../../assets/images/checkmark.svg'
import { ReactComponent as Edit } from '../../assets/images/edit.svg'
import { ReactComponent as Cancel } from '../../assets/images/cancel.svg'
import { ReactComponent as Chevron } from '../../assets/images/chevron.svg'
import { ReactComponent as Mail } from '../../assets/images/mail.svg'
import { ReactComponent as Heart } from '../../assets/images/heart.svg'
import { ReactComponent as HeartFilled } from '../../assets/images/heart-filled.svg'

import './Icon.scss'

interface IconProps {
  icon:
    'arrowLeft' |
    'hamburger' |
    'account' |
    'check' |
    'edit' |
    'cancel' |
    'chevron'|
    'heart'|
    'heartFilled'|
    'mail'
  size?: 'small' | 'medium' | 'large'
  space?: 'left' | 'right'
  className?: string
  onClick?: () => void
}

const Icons = {
  arrowLeft: ArrowLeft,
  account: Account,
  hamburger: Hamburger,
  check: Checkmark,
  edit: Edit,
  cancel: Cancel,
  chevron: Chevron,
  heart: Heart,
  heartFilled: HeartFilled,
  mail: Mail
}

const Icon = ({ icon, space, size, className, onClick }: IconProps) => {
  const Icon = icon ? Icons[icon] : undefined

  const iconSize = size || 'medium'

  return Icon
    ? <Icon
      className={classnames('icon', {
        [`icon--space-${space}`]: space,
        [`icon--${iconSize}`]: iconSize,
        'icon--active': onClick,
        [`${className}`]: className
      })}
      onClick={onClick}
    />
    : null
}

export default Icon
