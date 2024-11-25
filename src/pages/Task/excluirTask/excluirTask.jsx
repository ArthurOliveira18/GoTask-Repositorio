import React from 'react'
import { useState, useEffect } from 'react';
import style from './excluirTask.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import axios from 'axios';
const url = "http://localhost:3000/task";

const excluirTask = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  // Verificação para garantir que o usuário está logado
  const user = JSON.parse(localStorage.getItem('user'));
  const idResp = user ? user.idResp : null;

  // Função para buscar as tarefas com axios
  const fetchTasks = async () => {
    try {
      const response = await axios.get(url);  // Usando axios para pegar os dados
      const allTask = response.data;

      const filteredTask = allTask.filter(task => task.RespT === parseInt(idResp));

      setTasks(filteredTask); // Atualiza o estado com as tarefas
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // UseEffect para chamar a função de fetch quando o componente for montado
  useEffect(() => {
    fetchTasks();
  }, []); // O array vazio significa que o useEffect só será executado uma vez, quando o componente for montado

  // Função para armazenar o ID da tarefa selecionada
  const handleTaskClick = (task) => {
    localStorage.setItem('selectedTaskId', task.idTask); // Armazena o ID da tarefa no localStorage
    console.log("ID da tarefa armazenado:", localStorage.getItem('selectedTaskId')); // Confirmação no console
    navigate('/ExcluirTaskReal'); // Navega para a página de excluir
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divTasksDad}>
          {tasks.map((tarefas) => (
            <div
              key={tarefas.id}
              onClick={() => handleTaskClick(tarefas)} // Passa a tarefa para a função que armazena o ID
              className={style.divInfoTask}
            >
              <h1>{tarefas.Nome_task}</h1>
            </div>
          ))}
          <div className={style.divButtonTasks}>
            <div className={style.divIcon}>
              <button onClick={(e) => { e.preventDefault(); navigate('/TaskScreen'); }}>
                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>Check</span>
              </button>
            </div>
          </div>
        </div>

      </div>
      <FooterMain />
    </div>
  );
};

export default excluirTask
