import React from "react";
import Style from "../styles/Home.module.css";
import FooterMain from "./FooterMain";
import HeaderMain from "./HeaderMain";
import CardChildren from "./CardChildren";

const Home = () => {
  return (
    <div className={Style.pageContainer}>
      
      
      <HeaderMain />
      <CardChildren/>
      <FooterMain />
    </div>
  );
};

export default Home;
