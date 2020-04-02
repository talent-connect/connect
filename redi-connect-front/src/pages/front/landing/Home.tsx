import React from "react";
import LoggedOutWrapper from "../../../components/organisms/LoggedOutWrapper";
import Hero from "../../../components/organisms/RediHero";
import PreFooter from "../../../components/organisms/PreFooter";

export default function Home() {
  return (
    <LoggedOutWrapper>
      <Hero />
      <PreFooter />
    </LoggedOutWrapper>
  );
}
