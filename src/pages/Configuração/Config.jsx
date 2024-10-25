import style from "./Config.module.css";
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import {Link} from 'react-router-dom'


const Config = () => {
  return (
    <div className={style.pageContainer/*pageContainerConfig*/}>
      <HeaderMain />
      <div className={style.pageMain/*pageMainConfig*/}>
        <div className={style.divInputConfig}>
          {/* Div contendo as outras divs com as opções de trocar nome de usuario  */}

          <div>
            <span className="material-symbols-outlined" style={{color:"#fff", fontSize:"40px"}}>
              manufacturing
            </span>
          </div>

          <div className={style.divExcluir}>
            <h2>Excluir conta</h2>
          </div>

        </div>
        <div className={style.divButtonSair}>
          {/* div apenas para o button */}
          <Link to='/'>
            <button>SAIR DA CONTA</button>
          </Link>
        </div>
      </div>
      <FooterMain />
    </div>
  )
}

export default Config