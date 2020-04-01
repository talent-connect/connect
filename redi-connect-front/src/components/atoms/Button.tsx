import React from "react";
import "./Button.scss";

interface Props {
  text: string;
  size: "large" | "medium" | "small";
  type?: "default" | "simple";
  icon?: "arrow-right";
}

const Button = ({ text, type = "default", size, icon }: Props) => {
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
