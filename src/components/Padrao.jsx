import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import style from '../styles/Padrao.module.css'


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

