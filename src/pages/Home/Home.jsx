import Style from "./Home.module.css";
import FooterMain from "../../components/MainHeadFoot/Footer/FooterMain";
import HeaderMain from "../../components/MainHeadFoot/Header/HeaderMain";
import CardChildren from "./Crianca/CardChildren";

const Home = () => {
  return (
    <div className={Style.pageContainer}>
      <HeaderMain />
      <div className={Style.pageMain}>
        <CardChildren />
      </div>
      <FooterMain />
    </div>
  );
};

export default Home;
