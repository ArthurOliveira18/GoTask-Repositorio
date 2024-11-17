import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from '../PassagemTela/PassagemTela.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = "http://localhost:3000/task";

const PassagemTela = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Função para navegar para SelectDays e passar as informações da tarefa
  const handleNavigatePassTask = (task) => {
    navigate('/select-days', {
      state: {
        taskName: task.Nome_task,
        taskPoints: task.Pontos_task,
        taskId: task.idTask  // Passa o idTask aqui
      }
    });
  };


  // inicio verificação 

  const user = JSON.parse(localStorage.getItem('user'));

  const idResp = user ? user.idResp : null;

  // verificação

// Função para buscar as tarefas com axios
const fetchTasks = async () => {
  try {

    const response = await axios.get(url);  // Usando axios para pegar os dados

    const allTask = response.data;

    const filteredTask = allTask.filter(task => task.RespT === parseInt(idResp))

    setTasks(filteredTask); // Atualiza o estado com as tarefas

  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
  }
};
// UseEffect para chamar a função de fetch quando o componente for montado
useEffect(() => {
  fetchTasks();
}, []); // O array vazio significa que o useEffect só será executado uma vez, quando o componente for montado


  // Função para navegar para SelectDays e passar as informações da tarefa
const handleNavigatePass = (task) => {
  // Armazenando o idTask no localStorage
  localStorage.setItem('selectedTaskId', task.idTask);

  // Verifica se o idTask foi armazenado
  console.log("ID da task armazenado:", localStorage.getItem('selectedTaskId'));

  // Navega para a tela SelectDays passando as informações da tarefa
  navigate('/select-days', {
    state: {
      taskName: task.Nome_task,
      taskPoints: task.Pontos_task,
      taskId: task.idTask  // Passa o idTask aqui também
    }
  });
};

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divTasksDad}>
          {tasks.map((task) => (
            <div key={task.idTask} className={style.divInfoTask} onClick={() => handleNavigatePass(task)}>
              <h1>{task.Nome_task}</h1>
            </div>
          ))}
          <div className={style.divButtonTasks}>
            <div className={style.divIcon}>
              <button onClick={(e) => { e.preventDefault(); navigate('/editar-crianca'); }}>
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

export default PassagemTela;
