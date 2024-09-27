import React from 'react';
import Style from '../styles/FormLogin.module.css';
import FoorterLogCad from './FoorterLogCad';
import HeaderMain from './HeaderMain';

const FormLogin = () => {
  return (
<<<<<<< HEAD
    <div className={Style.formMain}>

      <HeaderMain/>
      <form>
        <label htmlFor="email">Email</label>
=======
    <div className = {Style.formMain}>
      <form >
        

      <label htmlFor="email">Email</label>
>>>>>>> d69e1b07ed23528822f88c1b7fd094c959d4e62c
        <div className={Style.divEmail}>
          <input type="email" name="email" id="email" required />
        </div>

        <label htmlFor="password">Senha</label>
        <div className={Style.divPassword}>
          <input type="password" name="password" id="password" />
          <button type="submit" id="oii">Entrar</button>
        </div>
      </form>
      <FoorterLogCad />
    </div>
  );
};

export default FormLogin;
