import React from "react";
import { LoggedOutLayout } from "../../../layouts/LoggedOutLayout";
// import { Link } from "react-router-dom";
import Button from "../../../components/atoms/Button";

export default function Home() {
  return (
    <LoggedOutLayout>
      {/* <div>hello home</div>
      <Link to="/front/login">LOGIN</Link> <br />
      <Link to="/front/signup/landing">SIGN UP</Link> */}
      <Button text="big" type="big" />
      <Button text="medium" type="medium" />
      <Button text="small" type="small" />
      <Button text="icon" type="icon" />
      <Button text="simple" type="simple" />
    </LoggedOutLayout>
  );
}
