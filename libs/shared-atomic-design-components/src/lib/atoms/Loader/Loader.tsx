import classnames from 'classnames'
import { Icon } from '../Icon'
import './Loader.scss'
import { LoaderProps } from './Loader.props';

function Loader ({ loading }: LoaderProps) {
  return (
    <div className={classnames('loader', { 'loader--active': loading })}>
      <Icon
        icon="loader"
        className="loader__icon"
        size="x-large"
      />
    </div>
  )
}

export default Loader
