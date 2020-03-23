import React from "react";
import Headline from "./Headline";
import Button from "./Button";
import "./GetInTouch.scss";

const GetInTouch = () => {
  return (
    <div className="getInTouch__wrapper">
      <div className="row">
        <div className="getInTouch__container">
          <div className="getInTouch__text-box">
            <Headline text="Want to get" boldText="in touch?" />
            <div className="getInTouch__text-box-text">
              If you have questions or just want to say hello, please do not
              hesitate to contact us!
            </div>
            <div className="getInTouch__text-box-btn">
              <Button text="say hello!" btnType="big" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
