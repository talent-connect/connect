import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import './Button.scss';

interface Props {
  children: any;
  className?: string;
  size?: 'large' | 'medium' | 'small';
  fullWidth?: boolean;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
  simple?: boolean;
  to?: string;
}

const Button = ({
  children,
  className,
  size = 'small',
  simple = false,
  fullWidth,
  onClick,
  separator,
  disabled,
  to,
}: Props) => {
  const baseClass = 'button';

  if (!to) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
          [`${baseClass}--${size}`]: size,
          [`${baseClass}--fullWidth`]: fullWidth,
          [`${baseClass}--separator`]: separator,
          [`${className}`]: className,
        })}
      >
        {children}
      </button>
    );
  }

  const isExternalLink = to.includes('http');

  if (isExternalLink) {
    return (
      <button
        onClick={() => (window.location.href = to)}
        type="button"
        className={classnames(baseClass, `${baseClass}--${simple ? 'simple' : 'default'}`, {
          [`${baseClass}--${size}`]: size,
          [`${baseClass}--fullWidth`]: fullWidth,
          [`${baseClass}--separator`]: separator,
          [`${className}`]: className,
        })}
      >
        {children}
      </button>
    );
  }

  return (
    <NavLink
      to={to || '/'}
      activeClassName={`${baseClass}--active`}
      className={classnames(baseClass, `${baseClass}--nav`, {
        [`${baseClass}--${size}`]: size,
      })}
    >
      {children}
    </NavLink>
  );
};

Button.Icon = Icon;

export default Button;
