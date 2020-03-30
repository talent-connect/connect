import React from "react";
import LoggedOutNavbar from "./LoggedOutNavbar";
import Footer from "./Footer";

const LoggedOutWrapper = ({ children }: any) => {
  return (
    <>
      <LoggedOutNavbar />
      {children}
      <Footer />
    </>
  );
};

export default LoggedOutWrapper;
