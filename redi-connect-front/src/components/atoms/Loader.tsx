import React from 'react'
import './Loader.scss'
import classnames from 'classnames'
import Icon from './Icon'

interface LoaderProps {
  loading?: boolean
}

const Loader = ({ loading }: LoaderProps) => {
  return (
    <div className={classnames('loader', { 'loader--active': loading })}>
      <Icon icon="loader" className="loader__icon" size="x-large"/>
    </div>
  )
}

export default Loader
