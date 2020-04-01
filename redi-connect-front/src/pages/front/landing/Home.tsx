import React from "react";
import LoggedOutWrapper from "../../../components/organisms/LoggedOutWrapper";
import Hero from "../../../components/organisms/RediHero";
import PreFooter from "../../../components/organisms/PreFooter";
import RediProgram from "../../../components/organisms/RediProgram";

export default function Home() {
  return (
    <LoggedOutWrapper>
      <Hero />
      <RediProgram />
      <PreFooter />
    </LoggedOutWrapper>
  );
}
