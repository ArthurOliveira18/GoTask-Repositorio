import React from 'react';
import Style from '../styles/FooterLogCad.module.css';
import { Link } from "react-router-dom";

const FooterLogCad = () => {
  return (
    <div className={Style.footerLog}>
      <Link to="/forgot-password">Esqueceu a senha?</Link> {/* Ajuste o caminho */}
      <Link to="/register">Não tem cadastro? Cadastre-se!!</Link> {/* Ajuste o caminho */}
    </div>
  );
}

export default FooterLogCad;
