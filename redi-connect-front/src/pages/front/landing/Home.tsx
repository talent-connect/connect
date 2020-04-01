import React from "react";
import LoggedOutWrapper from "../../../components/organisms/LoggedOutWrapper";
import Hero from "../../../components/organisms/RediHero";

export default function Home() {
  return (
    <LoggedOutWrapper>
      <Hero />
    </LoggedOutWrapper>
  );
}
