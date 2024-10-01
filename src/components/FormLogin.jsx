import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
import Style from '../styles/FormLogin.module.css';
import FoorterLogCad from './FoorterLogCad';
import HeaderMain from './HeaderMain';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar recarregar a página

    const correctEmail = 'admin@gmail.com';
    const correctPassword = 'admin123';

    if (email === correctEmail && password === correctPassword) {
      alert('Login bem-sucedido!');
      navigate('/Home'); // Redireciona para a rota '/Home'
    } else {
      setErrorMessage('Credenciais incorretas. Tente novamente.');
    }
  };

  return (
    <div className={Style.formMain}>
      <HeaderMain />

      <form onSubmit={handleSubmit} className={Style.formLogin}>
        <label htmlFor="email" className={Style.labelFormLogin}>Email</label>

        <div className={Style.divEmail}>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={Style.inputFormLogin}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="password" className={Style.labelFormLogin}>Senha</label>
        <div className={Style.divPassword}>
          <input
            type="password"
            name="password"
            id="password"
            className={Style.inputFormLogin}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={Style.buttonForm}>Entrar</button>
        </div>
      </form>

      {errorMessage && <p className={Style.error}>{errorMessage}</p>}

      <FoorterLogCad />
    </div>
  );
};

export default FormLogin;
