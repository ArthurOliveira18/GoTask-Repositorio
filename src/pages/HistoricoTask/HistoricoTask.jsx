import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from './HistoricoTask.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:3000/historicoTask';

const HistoricoTask = () => {
  const [tasks, setTasks] = useState([]);

  const fetchHistoryTask = async () => {
    try {
      const idCrianca = localStorage.getItem('selectedChildId');

      if (!idCrianca) {
        console.error("ID da criança não encontrado no localStorage.");
        return;
      }

      const response = await axios.get(url);
      const allHistoryTask = response.data;

      // Filtra as tarefas pelo ID da criança
      const filtredHistoryTask = allHistoryTask.filter(
        (historyT) => historyT.CriancaT === parseInt(idCrianca)
      );

      // Substituir duplicatas (feita substitui não feita)
      const updatedTasks = [];
      filtredHistoryTask.forEach((task) => {
        const existingTaskIndex = updatedTasks.findIndex(
          (t) => t.Task === task.Task
        );
        if (existingTaskIndex !== -1) {
          // Substitui tarefa não feita por feita
          if (task.feita === 1) {
            updatedTasks[existingTaskIndex] = task;
          }
        } else {
          updatedTasks.push(task);
        }
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchHistoryTask();
  }, []);

  const handleMarkAsDone = async (idHistoricoTask) => {
    try {
      // Atualiza no back-end
      await axios.put(`${url}/${idHistoricoTask}`, { feita: 1 });

      // Atualiza o estado local
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.idHistoricoTask === idHistoricoTask
            ? { ...task, feita: 1 }
            : task
        )
      );

      console.log(`Tarefa ${idHistoricoTask} marcada como feita.`);
    } catch (error) {
      console.error("Erro ao marcar tarefa como feita:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Ajuste para UTC-3
    const utcMinus3 = new Date(date.getTime() - 3 * 60 * 60 * 1000);

    // Formatação: dd/MM/yyyy HH:mm
    const day = String(utcMinus3.getDate()).padStart(2, '0');
    const month = String(utcMinus3.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = utcMinus3.getFullYear();
    const hours = String(utcMinus3.getHours()).padStart(2, '0');
    const minutes = String(utcMinus3.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.arrowMain1}>
          <Link to={'/escolha-filho'}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
        </div>

        <div className={style.divTasksDad}>
          {tasks.map((task) => (
            <div
              key={task.idHistoricoTask}
              className={`${style.divInfoTask} ${task.feita === 0 ? style.incompleteTask : style.inactiveTask
                }`} // Estilo baseado no status 'feita'
              onClick={() =>
                task.feita === 0 ? handleMarkAsDone(task.idHistoricoTask) : null
              } // Só marca como feita se ainda não estiver
            >
              <h1>{task.Nome_task}</h1>
              <p>
                {task.feita === 0
                  ? 'Status: Não feita'
                  : `Feita em: ${formatDateTime(task.dataTask)}`}
              </p>
            </div>
          ))}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default HistoricoTask;

