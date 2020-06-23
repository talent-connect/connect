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
import { ReactComponent as Clipboard } from '../../assets/images/clipboard.svg'
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg'
import { ReactComponent as Certificate } from '../../assets/images/certificate.svg'
import { ReactComponent as Search } from '../../assets/images/search.svg'
import { ReactComponent as Career } from '../../assets/images/career.svg'
import { ReactComponent as Arrow } from '../../assets/images/arrow-step.svg'
import { ReactComponent as Chat } from '../../assets/images/chat.svg'
import { ReactComponent as Handshake } from '../../assets/images/handshake.svg'

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
    'mail' |
    'clipboard' |
    'certificate' |
    'search' |
    'arrow' |
    'calendar' |
    'career' |
    'chat' |
    'handshake'
  size?: 'small' | 'medium' | 'large' | 'x-large'
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
  clipboard: Clipboard,
  calendar: Calendar,
  certificate: Certificate,
  search: Search,
  career: Career,
  arrow: Arrow,
  handshake: Handshake,
  chat: Chat,
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
