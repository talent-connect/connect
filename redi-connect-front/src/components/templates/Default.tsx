import React from "react";
import LoggedOutNavbar from "../organisms/LoggedOutNavbar";
import Footer from "../organisms/Footer";

interface Props {
  children: React.ReactNode;
}

const LoggedOut = ({ children }: Props) => (
  <>
    <LoggedOutNavbar />
    {children}
    <Footer />
  </>
);

export default LoggedOut;
