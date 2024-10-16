import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './Padrao.module.css'



const /* nome da pagina */Padrao = () => {
  return (
    <div className={style.pageContainer/* nome da pagina*/}>
        <HeaderMain/>
      <div className={style.pageMain/*nome da pagina*/}>
        {/* Conteudo padrao da pagina */}
      </div>
      <FooterMain/>
    </div>
  )
}

export default Padrao//nome da pagina

