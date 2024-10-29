// import style from "./ScreenPdf.module.css"; 


const ScreenPdf = () => {
  return (
    <div className="container">
        <h1 className="title">Impressão de tabela</h1>

        {/* Div preta com a img*/}
        <div className="table-container">
            <img src="./src/assets/tabelaPdf.png" alt="tabela" className="table-img"/>
        </div>

        {/* buttons */}
        <div className="button-container">
            <button className="print-button">Imprimir em PDF</button>
            <button className="print-button">Impressora</button>
        </div>
    </div>
  )
}

export default ScreenPdf
