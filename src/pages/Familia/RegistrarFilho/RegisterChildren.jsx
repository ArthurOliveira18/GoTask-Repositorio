import { useState } from 'react';
import axios from 'axios';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import style from '../RegistrarFilho/RegisterChildren.module.css';

import {Link, useNavigate} from 'react-router-dom'

const RegisterChildren = () => {
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [dtNasc, setDtNasc] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Enviando os dados para o backend
      await axios.post('http://localhost:3000/children', {
        nomeCrianca,
        dtNasc,
        pontos: 0,
        
      });

      alert('Criança cadastrada com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar criança:', error);
      alert('Erro ao cadastrar criança');
    }
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.arrowMain1}>
        <Link to={'/FamilyScreen'}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      <div className={style.pageMain}>
        <form className={style.formContainer} onSubmit={handleRegister}>
          <div className={style.inputGrup}>
            <label htmlFor="childName">Nome da Criança</label><br />
            <input
              type="text"
              placeholder="Digite o nome da criança"
              id="childName"
              value={nomeCrianca}
              onChange={(e) => setNomeCrianca(e.target.value)}
              required
            />
          </div>

          <div className={style.inputGrup}>
            <label htmlFor="birthDate">Data de nascimento</label><br />
            <input
              type="date"
              id="birthDate"
              value={dtNasc}
              onChange={(e) => setDtNasc(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={style.buttonRegister}>Cadastrar</button>
        </form>
      </div>
      <FooterMain />
    </div>
  );
};

export default RegisterChildren;
