import { FC } from 'react';
import Icon from '../Icon/Icon'
import './SocialMediaIcons.scss'
import { icons } from './SocialMediaIcons.props';

import { envRediLocation } from '../../../../../../apps/redi-connect/src/utils/env-redi-location'

const SocialMediaIcons: FC = () => (
  <ul className="media-icons__list">
    {icons.map((item) => (
      <li key={item.icon}>
        <a
          href={item[envRediLocation()]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={item.icon} className="media-icons__icon" />
        </a>
      </li>
    ))}
  </ul>
)

export default SocialMediaIcons
