import { useState } from 'react';
import axios from 'axios';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import style from '../RegistrarFilho/RegisterChildren.module.css';

import { Link, useNavigate } from 'react-router-dom';

const RegisterChildren = () => {
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [dtNasc, setDtNasc] = useState('');
  const navigate = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const responsavelId = loggedUser ? loggedUser.idResp : null; // Usando o idResp do responsável

    

    

    const newChild = {
      nomeCrianca,
      dtNasc,
      responsavelId
    };

    try {
      const response = await fetch("http://localhost:3000/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newChild)
      });

      const result = await response.json();
      console.log(result);
      alert("criança cadastrada com sucesso!!")
      navigate('/FamilyScreen')
    } catch (error) {
      console.error("Erro ao cadastrar criança:", error);
    }

  }

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.arrowMain1}>
        <Link to={'/FamilyScreen'}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div></div>
        <div></div>
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
