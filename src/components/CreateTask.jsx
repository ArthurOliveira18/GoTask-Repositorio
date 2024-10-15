
import{useState} from 'react'
import style from '../styles/CreateTask.module.css'
import { useNavigate, Link } from 'react-router-dom';
import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'


const CreateTask = () => {
  return (
    <div className={style.pageContainerCreateTask/* nome da pagina*/}>
        <HeaderMain/>
      <div className={style.pageMainCreateTask/*nome da pagina*/}>

      <div className={style.arrowMain1}>
        {/* criei essas outras divs vazias apenas para  */}
        {/* Comentario apenas para dar commit na main */}

          <Link to={'/TaskScreen'}>      
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>

          <div></div>
          
          <div></div>
        </div>

      <form className={style.formCreateTask}>
            {/* Essa div é a parte roxa que contem os inputs dentro dela. */}

            <div className={style.divCardCreateTask}>
                <div className={style.divInputsCreateTask}>
                    <h2>Descriçao da task</h2>
                    <input type="text" />
                </div>

                <div className={style.divInputsCreateTask}>
                    <h2>Pontos para task</h2>
                    <input type="number"  />
                </div>

            </div>

            <div className={style.divButtonCreateTask}>
                <button type='submit'>Cadastrar task</button>
            </div>
        </form>
      </div>
      <FooterMain/>
    </div>
  )
}

export default CreateTask