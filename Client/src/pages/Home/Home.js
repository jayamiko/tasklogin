import React from "react";
import Hero from "../../components/Hero/Hero";
import Main from "../../components/Main/Main";
import NavbarComponent from "../../components/Navbar/NavbarComponents";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <Hero />
      <Main />
    </>
  );
}
