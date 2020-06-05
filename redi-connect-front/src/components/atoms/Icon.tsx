import React from 'react'
import classnames from 'classnames'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg'
import { ReactComponent as Hamburger } from '../../assets/images/hamburger.svg'
import { ReactComponent as Account } from '../../assets/images/account.svg'
import './Icon.scss'

interface IconProps {
  icon: 'arrowLeft' | 'hamburger' | 'account'
  size?: 'small'
  space?: 'left' | 'right'
}

const Icons = {
  arrowLeft: ArrowLeft,
  account: Account,
  hamburger: Hamburger
}

const Icon = ({ icon, space, size }: IconProps) => {
  const Icon = icon ? Icons[icon] : undefined

  return Icon
    ? <Icon className={classnames('icon', { [`icon--space-${space}`]: space, [`icon--${size}`]: size })}/>
    : null
}

export default Icon
