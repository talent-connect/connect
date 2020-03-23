import React from "react";
import "./Button.scss";

const Button = ({ btnType, text }: { btnType: string; text: string }) => {
  return (
    <>
      <div className="btn__wrapper">
        <div className="btn__text">{text}</div>
      </div>
      <div className="btn__wrapper btn__background" />
    </>
  );
};

export default Button;
