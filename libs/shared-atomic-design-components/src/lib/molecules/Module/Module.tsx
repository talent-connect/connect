import { FunctionComponent, ReactNode } from 'react'
import { Caption } from '../../atoms'
import classnames from 'classnames'
import './Module.scss'

interface Props {
  title: string
  children: ReactNode
  buttons?: ReactNode
  className?: string
}

const Module: FunctionComponent<Props> = ({ title, children, buttons, className }) => {
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
