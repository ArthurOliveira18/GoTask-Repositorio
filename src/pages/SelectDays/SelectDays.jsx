import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from './SelectDays.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const url = "http://localhost:3000/historicoTask"

const SelectDays = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskName, taskPoints, taskId } = location.state || { taskName: "", taskPoints: 0, taskId: null };

  // State para armazenar os dias selecionados
  const [selectedDays, setSelectedDays] = useState([]);

  // Função para alternar a seleção dos dias
  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((d) => d !== day); // Remove o dia se já estiver selecionado
      } else {
        return [...prevSelectedDays, day]; // Adiciona o dia se não estiver selecionado
      }
    });
  };

  // Função para enviar os dias selecionados para o backend
  const handleSubmit = async () => {
    if (selectedDays.length === 0) {
      alert('Por favor, selecione pelo menos um dia.');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCrianca: 1,
          idTask: 1,
          dias: selectedDays
        }),
      });

      if (response.ok) {
        alert('Tarefa adicionada com sucesso!');
        navigate('/passagem-tela'); // Redireciona para a página anterior ou para a desejada
      } else {
        alert('Erro ao adicionar a tarefa.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados.');
    }
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.arrowMain1}>
          <Link to={'/passagem-tela'}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
        </div>

        <div className={style.divPurpleInfo}>
          <h1>Nome da Tarefa</h1>
          <div className={style.nameTask}>
            <h2>{taskName}</h2>
          </div>
          <h1>Pontos da Tarefa</h1>
          <div className={style.pointsTask}>
            <h2>{taskPoints} P</h2>
          </div>

          <div className={style.divSemanas}>
            <div className={style.divTresInline}>
              <div
                className={style.divDays}
                onClick={() => toggleDaySelection('seg')}
                style={{ backgroundColor: selectedDays.includes('seg') ? '#c3a2f5' : '' }}
              >
                Segunda
              </div>
              <div
                className={style.divDays}
                onClick={() => toggleDaySelection('ter')}
                style={{ backgroundColor: selectedDays.includes('ter') ? '#c3a2f5' : '' }}
              >
                Terça
              </div>
              <div
                className={style.divDays}
                onClick={() => toggleDaySelection('qua')}
                style={{ backgroundColor: selectedDays.includes('qua') ? '#c3a2f5' : '' }}
              >
                Quarta
              </div>
            </div>
            <div className={style.divTresInline}>
              <div
                className={style.divDays}
                onClick={() => toggleDaySelection('qui')}
                style={{ backgroundColor: selectedDays.includes('qui') ? '#c3a2f5' : '' }}
              >
                Quinta
              </div>
              <div
                className={style.divDays}
                onClick={() => toggleDaySelection('sex')}
                style={{ backgroundColor: selectedDays.includes('sex') ? '#c3a2f5' : '' }}
              >
                Sexta
              </div>
              <div
                className={style.divDays}
                onClick={() => toggleDaySelection('fds')}
                style={{ backgroundColor: selectedDays.includes('fds') ? '#c3a2f5' : '' }}
              >
                Fim-De-Semana
              </div>
            </div>
          </div>
        </div>

        <div className={style.divButtons}>
          <button className={style.purpleButton} onClick={handleSubmit}>Adicionar</button>

        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default SelectDays;
