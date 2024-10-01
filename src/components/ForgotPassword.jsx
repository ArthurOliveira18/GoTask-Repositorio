import HeaderMain from './HeaderMain'
import FoorterLogCad from './FoorterLogCad'
import { Link } from "react-router-dom";
import Style from '../styles/ForgotPassword.module.css'

const ForgotPassword = () => {
  return (
    <div>
      <HeaderMain/>

      <div className={Style.arrowMain2}>
            <Link to={'/'}>      
              <span class="material-symbols-outlined">
                arrow_back
              </span>
            </Link>
            
            <div></div>

            <div></div>
          </div>

      <div className={Style.mainForgotPassword}>

          <div className={Style.formForgotPassword}>
            <h2>Recuperar senha</h2>
            <br />
            <br />
            <p>Digite seu email para alterar a sua senha</p>
            <br />
            <input type="email" name="email" id="email" />
            
          </div>

          <div className={Style.divButtonForgot}>
            <button className={Style.buttonForgotPassword}>Entrar</button>
          </div>
      </div>
      
      

      <FoorterLogCad/>

    </div>
  )
}

export default ForgotPassword