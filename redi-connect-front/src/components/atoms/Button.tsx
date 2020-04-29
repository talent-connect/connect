import React from 'react'
import './Button.scss'

interface Props {
  text: string
  size: 'large' | 'medium' | 'small'
  type?: 'default' | 'simple'
  icon?: 'arrow-right'
  fullWidth?: boolean
  onButtonPress: any
  disabled?: boolean
}

const Button = ({
  text,
  type = 'default',
  size,
  icon,
  fullWidth,
  onButtonPress,
  disabled
}: Props) => {
  const baseClass = 'button'

  return (
    <button
      className={`${baseClass} ${baseClass}--${type} ${baseClass}--${size} ${fullWidth ? 'button--fullwidth' : null}`}
      onClick={onButtonPress}
      disabled={disabled}
    >
      {text}
      {icon && (
        <img
          src={require(`../../assets/images/${icon}.svg`)}
          alt="icon"
          className="custom-button--img"
        />
      )}
    </button>
  )
}

export default Button
