import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './HistoricoTask.module.css'

const HistoricoTask = () => {
  return (
    <div className={style.pageContainer/* nome da pagina*/}>
      <HeaderMain />
      <div className={style.pageMain/*nome da pagina*/}>
        {/* Conteudo padrao da pagina */}
      </div>
      <FooterMain />
    </div>
  )
}

export default HistoricoTask