import classnames from 'classnames'
import React from 'react'
import { Caption } from '../atoms'
import './Module.scss'

interface Props {
  title: string
  children: React.ReactNode
  buttons?: React.ReactNode
  className?: string
}

function Module(props: Props) {
  const { title, children, buttons, className } = props

  return (
    <div className={classnames('module', { [`${className}`]: className })}>
      <div className="module__header">
        <Caption>{title}</Caption>
        <div className="module__header__buttons"> {buttons && buttons}</div>
      </div>
      <div className="module__body">{children}</div>
    </div>
  )
}

export default Module
