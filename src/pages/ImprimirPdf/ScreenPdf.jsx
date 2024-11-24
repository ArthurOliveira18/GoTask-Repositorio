import style from "./ScreenPdf.module.css";
import FooterMain from "../../components/MainHeadFoot/Footer/FooterMain";
import HeaderMain from "../../components/MainHeadFoot/Header/HeaderMain";
import PdfMolde from "./pdf/PdfMolde"
import html2pdf from "html2pdf.js"
import { Link } from 'react-router-dom';



const ScreenPdf = () => {

    const baixarpdf = () => {

      const content = document.querySelector("#conteudoPdf");


    const options = {
        margin: [0,0,0,0],
        filename: "arquivo.pdf",
        html2canvas: {scale: 1, y: 140 },
        jsPDF: {unit: "mm", format: "a4", orientation: "landscape"}
    }

    html2pdf().set(options).from(content).save();

    }; 


  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      {/* Div preta com a img*/}
      <div className={style.pageMain}>
        <div className={style.arrowMain1}>
          <Link to={'/FamilyScreen'}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div></div>
          <div></div>
        </div>
        <div className={style.divPurple}>
          <h1 className={style.title}>Impressão de tabela</h1>
          <div className={style.imgTable}>
            <img src="./src/assets/tabelaPdf.png" alt="tabela" className={style.tableImg} />
          </div>
          {/* buttons */}
          <div className={style.buttonContainer}>
            <button onClick={baixarpdf} className={style.printButton}>Baixar PDF</button>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>

  )
}

export default ScreenPdf