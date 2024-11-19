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
      setTasks(filtredHistoryTask);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchHistoryTask();
  }, []);

  const handleTaskClick = (task) => {
    const idCrianca = localStorage.getItem('selectedChildId');
    if (task.CriancaT === parseInt(idCrianca)) {
      console.log("Tarefa pertencente à criança:", task);
    } else {
      console.warn("Tarefa não pertence à criança selecionada.");
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
              className={`${style.divInfoTask} ${task.feita === 0 ? style.incompleteTask : style.inactiveTask}`} // Adiciona estilo baseado no valor de 'feita'
              onClick={() => handleTaskClick(task)}
            >
              <h1>{task.Nome_task}</h1>
              <p> {task.feita === 0 ? 'Status: Não feita' : formatDateTime(task.dataTask)}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default HistoricoTask;
