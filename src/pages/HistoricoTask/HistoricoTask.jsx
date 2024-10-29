import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './HistoricoTask.module.css'
import { Link } from 'react-router-dom'

const HistoricoTask = () => {
  return (
    <div className={style.pageContainer/* nome da pagina*/}>
      <HeaderMain />
      <div className={style.pageMain/*nome da pagina*/}>
        {/* Conteudo padrao da pagina */}

        <div className={style.arrowMain1}>
          {/* criei essas outras divs vazias apenas para  */}

          <Link to={'/escolha-filho'}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>

          <div></div>

          <div></div>
        </div>

      </div>
      <FooterMain />
    </div>
  )
}

export default HistoricoTask