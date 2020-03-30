import React, { SFC } from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  size: "large" | "medium" | "small";
  type?: "default" | "simple";
  icon?: "arrow-right";
}

const Button: SFC<ButtonProps> = ({ text, type = "default", size, icon }) => {
  const baseClass = "button";

  return (
    <button
      className={`${baseClass} ${baseClass}--${type} ${baseClass}--${size}`}
    >
      {text}
      {icon && (
        <img
          src={require(`../../assets/images/${icon}.svg`)}
          alt="icon"
          className="button--img"
        />
      )}
    </button>
  );
};

export default Button;
