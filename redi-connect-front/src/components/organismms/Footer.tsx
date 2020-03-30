import React from "react";
import { Columns } from "react-bulma-components";
import Icons from "../atoms/MediaIcons";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <Columns>
          <Columns.Column className="is-hidden-mobile">
            <p>
              <a href="https://www.redi-school.org/">ReDI School Website</a>
            </p>
            <p>&copy; {year} By ReDI School</p>
          </Columns.Column>
          <Columns.Column size={4} className="is-hidden-tablet">
            <p className="has-text-weight-bold is-size-4">Follow us</p>
            <Icons />
          </Columns.Column>
          <Columns.Column size={6}>
            <p>
              <a
                href="https://www.redi-school.org/imprint"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </p>
            <p>
              <a href="/" target="_blank" rel="noopener noreferrer">
                FAQ
              </a>
            </p>
            <p>
              <a
                href="https://www.redi-school.org/berlin-transparency"
                target="_blank"
                rel="noopener noreferrer"
              >
                Transparency
              </a>
            </p>
            <p>
              <a href="/">Cookie policy</a>
            </p>
            <p>
              <a
                href="https://www.redi-school.org/data-privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data privacy policy
              </a>
            </p>
          </Columns.Column>
          <Columns.Column className="is-hidden-mobile">
            <p>Follow us</p>
            <Icons />
          </Columns.Column>
          <Columns.Column className="is-hidden-tablet has-text-weight-semibold">
            <span>
              <a href="https://www.redi-school.org/">ReDI School Website</a>
            </span>
            <span className="is-pulled-right">
              &copy; {year} By ReDI School
            </span>
          </Columns.Column>
        </Columns>
      </div>
    </footer>
  );
};

export default Footer;
