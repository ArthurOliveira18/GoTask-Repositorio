import style from './CadBeneficio.module.css';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain'
import CardRecompensa from './CardRecompensa/CardRecompensa';
import {Link} from 'react-router-dom'


const CadBeneficio = () => {
  return (
    <div className={style.pageContainerCadTask}>
      <HeaderMain />
      <div className={style.pageMainCadTask}>

        <div className={style.arrowMain1}>
        {/* criei essas outras divs vazias apenas para  */}

          <Link to={'/Store'}>      
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>

          <div></div>
          
          <div></div>
        </div>

        <CardRecompensa/>
        
      </div>
      <FooterMain />
    </div>
  );
};

export default CadBeneficio;
