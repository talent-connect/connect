import React from "react";
// import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";
// import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import ProgramInfo from "../../../components/ProgramInfo";
import GetInTouch from "../../../components/GetInTouch";
import Footer from "../../../components/Footer";

export default function Home() {
  return (
    // <LoggedOutLayout>
    //   <div>hello home</div>
    //   <Link to="/front/login">LOGIN</Link> <br />
    //   <Link to="/front/signup/landing">SIGN UP</Link>
    // </LoggedOutLayout>
    <React.Fragment>
      <Navbar />
      <Hero />
      <ProgramInfo />
      <GetInTouch />
      <Footer />
    </React.Fragment>
  );
}
