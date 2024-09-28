import React from 'react';
import Style from '../styles/FormLogin.module.css';
import FoorterLogCad from './FoorterLogCad';
import HeaderMain from './HeaderMain';



const FormLogin = () => {
  return (
    <div className={Style.formMain}>

      <HeaderMain/>
      <form>
        <label htmlFor="email">Email</label>

        <div className={Style.divEmail}>
          <input type="email" name="email" id="email" required className={Style.inputFormLogin}/>
        </div>

        <label htmlFor="password">Senha</label>
        <div className={Style.divPassword}>
          <input type="password" name="password" id="password" className={Style.inputFormLogin} />
          <button type="submit" className={Style.buttonForm}>Entrar</button>
        </div>
      </form>
      <FoorterLogCad />
    </div>
  );
};

export default FormLogin;
