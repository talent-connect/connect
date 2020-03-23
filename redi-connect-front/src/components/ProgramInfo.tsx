import React from "react";
import Title from './Title';
import search from '../assets/images/search.svg';
import calendar from '../assets/images/calendar.svg';
import career from '../assets/images/career.svg';
import offline from '../assets/images/offline.svg';
import "./ProgramInfo.scss";

const ProgrammInfo = () => {
  return (
    <div className="program__wrapper">
      <div className="row">
        <div className="program__container">
          <Title intro="about redi connect" color="#F15A22" title="What our mentorship program is all about ..." />
          <div className="program__icons-wrapper">
            <div className="program__icon">
              <img src={search} alt="icon" className="program__icon-img" />
              <div className="program__icon-text">Connect yourself with the right mentor/ mentee </div>
            </div>
            <div className="program__icon">
              <img src={career} alt="icon" className="program__icon-img" />
              <div className="program__icon-text">Get/ give career and personal advice and support </div>
            </div>
            <div className="program__icon">
              <img src={calendar} alt="icon" className="program__icon-img" />
              <div className="program__icon-text">Schedule meetings to stay on track</div>
            </div>
            <div className="program__icon">
              <img src={offline} alt="icon" className="program__icon-img" />
              <div className="program__icon-text">Get advice on how to best connect offline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammInfo;
