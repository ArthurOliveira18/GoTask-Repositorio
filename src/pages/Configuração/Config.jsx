import style from "./Config.module.css";
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
/*uai???? Loja AQUI????? ta bão */

const Config = () => {
  return (
    <div className={style.pageContainer/*pageContainerConfig*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainConfig*/}>
       <p>Teste</p>
      </div>
      <FooterMain/>
    </div>
  )
}

export default Config