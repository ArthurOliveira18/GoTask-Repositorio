import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './SelectDays.module.css'
import { Link } from 'react-router-dom'

const SelectDays = () => {
    return (
        <div className={style.pageContainer/* nome da pagina*/}>
            <HeaderMain />
            <div className={style.pageMain/*nome da pagina*/}>
                {/* Conteudo padrao da pagina */}

                <div className={style.arrowMain1}>
                    {/* criei essas outras divs vazias apenas para  */}

                    <Link to={'/passagem-tela'}>
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                    </Link>

                    <div></div>

                    <div></div>
                </div>

                <div className={style.divPurpleInfo}>
                    <h1>Nome da Task</h1>
                    <div className={style.nameTask}>
                        <h2>Levar o Ozi para passear</h2>
                    </div>
                    <h1>Recompensa da Task</h1>
                    <div className={style.pointsTask}>
                        <h2>10 P</h2>
                    </div>

                    <div className={style.divSemanas}>
                        <div className={style.divTresInline}>
                            <div className={style.divDays}>Segunda</div>
                            <div className={style.divDays}>Terça</div>
                            <div className={style.divDays}>Quarta</div>
                        </div>

                        <div className={style.divTresInline}>
                            <div className={style.divDays}>quinta</div>
                            <div className={style.divDays}>Sexta</div>
                            <div className={style.divDays}>Fim-De-Semana</div>
                        </div>
                    </div>
                </div>
                <div className={style.divButtons}>
                    <button className={style.purpleButton}>Adicionar</button>
                    <button className={style.redButton}>Cadastrar</button>
                </div>
            </div>
            <FooterMain />
        </div>
    )
}

export default SelectDays