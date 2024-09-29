import React, { useState } from 'react';
import Style from '../styles/FormLogin.module.css';
import FoorterLogCad from './FoorterLogCad';
import HeaderMain from './HeaderMain';

const FormLogin = () => {
  // Estados para armazenar email e senha inseridos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função de validação de login
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar recarregar a página

    // Credenciais pré-definidas
    const correctEmail = 'admin@gmail.com';
    const correctPassword = 'admin123';

    // Verifica se as credenciais estão corretas
    if (email === correctEmail && password === correctPassword) {
      alert('Login bem-sucedido!');
      // Aqui você pode redirecionar para uma página ou prosseguir
    } else {
      setErrorMessage('Credenciais incorretas. Tente novamente.');
    }
  };

  return (
    <div className={Style.formMain}>
      <HeaderMain />

      <form onSubmit={handleSubmit} className={Style.formLogin}> {/* Adiciona o onSubmit no form */}
        <label htmlFor="email" className={Style.labelFormLogin}>Email</label>

        <div className={Style.divEmail}>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={Style.inputFormLogin}
            value={email} // Vincula ao estado email
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado quando o usuário digita (ou seja, isso serve para mostrar em tempo real no input oq o usuario digitou)
          />
        </div>

        <label htmlFor="password" className={Style.labelFormLogin}>Senha</label>
        <div className={Style.divPassword}>
          <input
            type="password"
            name="password"
            id="password"
            className={Style.inputFormLogin}
            value={password} // Vincula ao estado password
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado quando o usuário digita (ou seja, isso serve para mostrar em tempo real no input oq o usuario digitou)
          />
          <button type="submit" className={Style.buttonForm}>Entrar</button>
        </div>
      </form>

      {/* Exibe uma mensagem de erro se as credenciais estiverem incorretas */}
      {errorMessage && <p className={Style.error}>{errorMessage}</p>}

      <FoorterLogCad />
    </div>
  );
};

export default FormLogin;
