import React from "react";
import "./MediaIcons.scss";
import linkedin from "../../assets/images/linkedin.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import medium from "../../assets/images/medium.svg";

const icons = [
  {
    image: linkedin,
    link: "https://www.linkedin.com/school/redi-school-of-digital-integration/",
  },
  { image: twitter, link: "https://twitter.com/redischool?lang=en" },
  { image: instagram, link: "https://www.instagram.com/redischool/" },
  { image: medium, link: "https://www.meetup.com/en-AU/ReDI-school/" },
];

const SocialMediaIcons = () => (
  <div className="media-icons__wrapper">
    {icons.map(icon => {
      return (
        <a
          href={icon.link}
          className="media-icons__icon"
          key={icon.image}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icon.image} alt="icon" className="media-icon__img" />
        </a>
      );
    })}
  </div>
);

export default SocialMediaIcons;
