import React from "react";
import { Button } from "react-bulma-components";
import "./Button.scss";

interface Props {
  text: string;
  size: "large" | "medium" | "small";
  type?: "default" | "simple";
  icon?: "arrow-right";
}

const CustomButton = ({ text, type = "default", size, icon }: Props) => {
  const baseClass = "button";

  return (
    <Button
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
    </Button>
  );
};

export default CustomButton;
