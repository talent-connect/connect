import React from "react";
import LoggedOutNavbar from "./LoggedOutNavbar";
import Footer from "./Footer";

const LoggedOutWrapper: React.FC = ({ children }) => {
  return (
    <>
      <LoggedOutNavbar />
      {children}
      <Footer />
    </>
  );
};

export default LoggedOutWrapper;
