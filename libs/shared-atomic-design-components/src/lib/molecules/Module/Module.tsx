import { Caption } from '../../atoms'
import classnames from 'classnames'
import './Module.scss'
import { ModuleProps } from './Module.props';

function Module ({
  title,
  children,
  buttons,
  className
}: ModuleProps) {
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
