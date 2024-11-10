import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import style from '../RegistrarFilho/RegisterChildren.module.css';

const url = "http://localhost:3000/children";

const RegisterChildren = () => {
  const navigate = useNavigate();

  // Estado para armazenar as informações do formulário
  const [childName, setChildName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Função para enviar os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const responsavelId = localStorage.getItem('responsavelId'); // Obtém o ID do responsável do localStorage

    if (!responsavelId) {
      alert('Responsável não encontrado!');
      return;
    }

    // Enviar os dados para o backend
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'responsavel-id': responsavelId, // Envia o ID do responsável no cabeçalho
        },
        body: JSON.stringify({ nomeCrianca: childName, dtNasc: birthDate }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Criança cadastrada com sucesso!');
        navigate('/FamilyScreen'); // Navega para outra página após o sucesso
      } else {
        alert('Erro ao cadastrar criança');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao enviar os dados');
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
        <form className={style.formContainer} onSubmit={handleSubmit}>
          <div className={style.inputGrup}>
            <label htmlFor="childName">Nome da Criança</label><br />
            <input
              type="text"
              placeholder="Digite o nome da criança"
              id="childName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
          </div>

          <div className={style.inputGrup}>
            <label htmlFor="birthDate">Data de nascimento</label><br />
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" className={style.buttonRegister}>Cadastrar</button>
          </div>
        </form>
      </div>

      <FooterMain />
    </div>
  );
};

export default RegisterChildren;
