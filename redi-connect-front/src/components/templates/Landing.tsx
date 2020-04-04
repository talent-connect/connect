import React from "react";
import LoggedOutNavbar from "../organisms/LoggedOutNavbar";
import Footer from "../organisms/Footer";

const Landing: React.FunctionComponent = ({ children }) => (
  <>
    <LoggedOutNavbar />
    {children}
    <Footer />
  </>
);

export default Landing;
