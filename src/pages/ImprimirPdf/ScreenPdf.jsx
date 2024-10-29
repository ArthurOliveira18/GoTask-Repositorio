import style from "./ScreenPdf.module.css";
import FooterMain from "../../components/MainHeadFoot/Footer/FooterMain";
import HeaderMain from "../../components/MainHeadFoot/Header/HeaderMain";


const ScreenPdf = () => {
  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      {/* Div preta com a img*/}
      <div className={style.pageMain}>
        <div className={style.divPurple}>
          <h1 className={style.title}>Impressão de tabela</h1>
          <div className={style.imgTable}>
          <img src="./src/assets/tabelaPdf.png" alt="tabela" className={style.tableImg} />
          </div>
          {/* buttons */}
          <div className={style.buttonContainer}>
            <h1 className={style.title2}>Imprimir em</h1>
            <button className={style.printButton}>Imprimir em PDF</button>
            <button className={style.printButton}>Impressora</button>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>

  )
}

export default ScreenPdf
