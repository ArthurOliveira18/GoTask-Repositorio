import { useState } from 'react';
import style from './CreateTask.module.css';
import { Link, useNavigate } from 'react-router-dom';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';

const url = "http://localhost:3000/task";

const CreateTask = () => {
  const navigate = useNavigate();

  const [Nome_task, setNome_task] = useState('');
  const [Pontos_task, setPontos_task] = useState('');

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const responsavelId = loggedUser ? loggedUser.idResp : null; // Usando o idResp do responsável

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verifica se o responsavelId existe
    if (!responsavelId) {
      alert("Responsável não encontrado. Você precisa estar logado.");
      return;
    }

    const newTask = {
      Nome_task,
      Pontos_task,
      RespT: responsavelId, // Adiciona o responsavelId ao objeto
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const result = await response.json();
      console.log(result);
      alert("Task cadastrada com sucesso!!");
      navigate('/TaskScreen');
    } catch (error) {
      console.error("Erro ao cadastrar task:", error);
      alert("Ocorreu um erro ao cadastrar a tarefa.");
    }
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.arrowMain1}>
          <Link to={'/TaskScreen'}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>
        </div>

        <form className={style.formCreateTask} onSubmit={handleRegister}>
          <div className={style.divCardCreateTask}>
            <div className={style.divInputsCreateTask}>
              <h2>Descrição da task</h2>
              <input
                type="text"
                value={Nome_task}
                onChange={(e) => setNome_task(e.target.value)}
              />
            </div>

            <div className={style.divInputsCreateTask}>
              <h2>Pontos para task</h2>
              <input
                type="number"
                value={Pontos_task}
                onChange={(e) => setPontos_task(e.target.value)}
              />
            </div>
          </div>

          <div className={style.divButtonCreateTask}>
            <button type="submit">Cadastrar task</button>
          </div>
        </form>
      </div>
      <FooterMain />
    </div>
  );
};

export default CreateTask;
