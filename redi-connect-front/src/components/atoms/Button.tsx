import React from "react";
import arrow from "../../assets/images/arrow-right.svg";
import "./Button.scss";

const Button = ({ type, text }: { type: string; text: string }) => {
  let customTextStyle;
  let customContainerStyle;

  switch (type) {
    case "big":
      customTextStyle = "button__text-big";
      customContainerStyle = "button__container-big";
      break;
    case "medium":
      customTextStyle = "button__text-medium";
      customContainerStyle = "button__container-medium";
      break;
    case "small":
      customTextStyle = "button__text-small";
      customContainerStyle = "button__container-small";
      break;
    case "icon":
      customTextStyle = "button__text-icon";
      customContainerStyle = "button__container-icon";
      break;
    default:
      customTextStyle = "button__text-medium";
      customContainerStyle = "button__container-medium";
      break;
  }

  return (
    <>
      {type !== "simple" ? (
        <button className={`button__container ${customContainerStyle}`}>
          <div className="button__background" />
          <div className="button__background button__box">
            <div className="button__text-default">
              <span className={`${customTextStyle}`}>{text}</span>
              {type === "icon" ? (
                <img src={arrow} alt="icon" className="button__text-arrow" />
              ) : null}
            </div>
          </div>
          s
        </button>
      ) : (
        <button className="button__simple">{text}</button>
      )}
    </>
  );
};

export default Button;
