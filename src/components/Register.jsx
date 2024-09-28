import React from 'react'
import Style from '../styles/Register.module.css'
import GoTask from '../assets/logoGt.png'

const Register = () => {
  return (
    <div>
      
      <div className={Style.header}>
        <span class="material-symbols-outlined">
          arrow_back
        </span>

        <div></div>
        
        <div></div>
      </div>

      <form >

        <div className={Style.formRegister}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required className={Style.inputRegister}/>

          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" required className={Style.inputRegister}/>

          <label htmlFor="username">Nome e usuário</label>
          <input type="text" name="username" id="username"  required className={Style.inputRegister}/>

          <img src={GoTask} alt=""  className={Style.imgGoTask}/>

          <button type='submit' className={Style.buttonRegister}>Cadastrar-se</button>
        </div>
        </form>
    </div>
  )
}

export default Register