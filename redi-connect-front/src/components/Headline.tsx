import React from "react";
import "./Headline.scss";

const Headline = ({ text, boldText }: { text?: string; boldText?: string }) => {
  return (
    <div className="headline__wrapper">
      <span>
        <h1 className="headline__text">{text}</h1>
      </span>
      <span>
        <h1 className="headline__text headline__text-bold">{boldText}</h1>
      </span>
    </div>
  );
};

export default Headline;
