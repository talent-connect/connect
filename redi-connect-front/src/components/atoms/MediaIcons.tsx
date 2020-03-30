import React, { SFC } from "react";
import "./MediaIcons.scss";
import linkedin from "../../assets/images/linkedin.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import medium from "../../assets/images/medium.svg";

const SocialMediaIcons = () => {
  const icons = [
    {
      name: linkedin,
      link:
        "https://www.linkedin.com/school/redi-school-of-digital-integration/",
    },
    { name: twitter, link: "https://twitter.com/redischool?lang=en" },
    { name: instagram, link: "https://www.instagram.com/redischool/" },
    { name: medium, link: "https://www.meetup.com/en-AU/ReDI-school/" },
  ];

  return (
    <div className="media-icons">
      {icons.map(icon => {
        return (
          <a
            href={icon.link}
            className="media-icon"
            key={icon.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={icon.name} alt="icon" className="media-icon__img" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaIcons;
