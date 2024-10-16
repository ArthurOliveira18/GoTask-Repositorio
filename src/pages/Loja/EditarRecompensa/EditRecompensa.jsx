import style from './EditRecompensa.module.css'
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain'
import {Link} from 'react-router-dom'
/*Não sei onde colocar essa BOMBA */
const EditRecompensa = () => {
  return (
    <div className={style.pageContainerEditRecomp/* nome da pagina*/}>
        <HeaderMain/>
      <div className={style.pageMainEditRecomp/*nome da pagina*/}>

      <div className={style.arrowMain1}>
        {/* criei essas outras divs vazias apenas para  */}

          <Link to={'/store'}>      
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>

          <div></div>
          
          <div></div>
        </div>

      <form className={style.formRecompensa}>
            {/* Essa div é a parte roxa que contem os inputs dentro dela. */}

            <div className={style.divCardRecompensa}>
                <div className={style.divInputsRecompensas}>
                    <h2>Beneficio</h2>
                    <input type="text" />
                </div>

                <div className={style.divInputsRecompensas}>
                    <h2>Pontos para redivincar</h2>
                    <input type="number"  />
                </div>

            </div>

            <div className={style.divButtonRecompensa}>
                <button type='submit'>Alterar</button>
            </div>
        </form>
      </div>
      <FooterMain/>
    </div>
  )
}

export default EditRecompensa