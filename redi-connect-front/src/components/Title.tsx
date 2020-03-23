import React from "react";
import "./Title.scss";

const Title = ({
  intro,
  title,
  color
}: {
  intro: string;
  title: string;
  color: string;
}) => {
  return (
    <div className="title__wrapper">
      <div className="row">
        <div className="title__container">
          <div className="title__intro-text">{intro}</div>
          <div className="title__separator" />
          <div className="title__headline">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default Title;
