import React from 'react'
import Style from '../styles/Register.module.css'
import GoTask from '../assets/logoGt.png'
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      
      <div className={Style.header}>
        {/* criei essas outras divs vazias apenas para  */}

        <Link to={'/FormLogin'}>      
          <span class="material-symbols-outlined">
            arrow_back
          </span>
        </Link>

        <div></div>
        
        <div></div>
      </div>

      <form >

        {/* Div contendo todos os elementos tirando o button. */}
        <div className={Style.formRegister}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required className={Style.inputRegister}/>

          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" required className={Style.inputRegister}/>

          <label htmlFor="username">Nome e usuário</label>
          <input type="text" name="username" id="username"  required className={Style.inputRegister}/>

          <img src={GoTask} alt=""  className={Style.imgGoTask}/>

          
        </div>

        <button type='submit' className={Style.buttonRegister}>Cadastrar-se</button>
        </form>
    </div>
  )
}

export default Register