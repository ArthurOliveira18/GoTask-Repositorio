import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './Historico.module.css'

const Historico = () => {
  return (
    <div className={style.pageContainer/* nome da pagina*/}>
      <HeaderMain />
      <div className={style.pageMain/*nome da pagina*/}>
        {/* Conteudo padrao da pagina */}
        <h1>aaaaa</h1>
      </div>
      <FooterMain />
    </div>
  )
}

export default Historico