import React from "react";
import Home from "./Home";
import Featured from "./Featured";
import BestSeller from "./BestSeller";

const MainHome = () => {
  return (
    <>
      <section id="home">
        <Home />
      </section>
      <section id="featured">
        <Featured />
      </section>
      <section id="best-seller">
        <BestSeller />
      </section>
    </>
  );
};

export default MainHome;
