import { useState, useEffect } from "react";
import style from './CardChildren.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardChildren = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtém o objeto 'user' do localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const idResp = user ? user.idResp : null;

  // Função para buscar dados do backend
  const fetchChildrenAndTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/childrenTask/${idResp}`);
      const groupedData = response.data.reduce((acc, current) => {
        const existingChild = acc.find(child => child.id === current.criancaId);

        if (existingChild) {
          // Evita duplicação de tarefas
          const taskExists = existingChild.task.some(task => task.taskName === current.taskName);
          if (!taskExists) {
            existingChild.task.push({
              taskName: current.taskName,
              points: current.taskPoints,
              complete: current.taskComplete === 1
            });
          }
        } else {
          acc.push({
            id: current.criancaId,
            nomeCrianca: current.nomeCrianca,
            totalPoints: current.totalPoints,
            task: current.taskName ? [{
              taskName: current.taskName,
              points: current.taskPoints,
              complete: current.taskComplete === 1
            }] : []
          });
        }
        return acc;
      }, []);
      setChildren(groupedData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setError("Erro ao carregar dados. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idResp) {
      fetchChildrenAndTasks();
    } else {
      setError("Usuário não identificado.");
      setLoading(false);
    }
  }, [idResp]);

  const handleConfig = () => {
    navigate('/Config');
  };

  const handleTaskChange = (childId, taskIndex) => {
    setChildren(prevChildren => {
      return prevChildren.map(child => {
        if (child.id === childId) {
          const updatedTasks = child.task.map((task, index) => {
            if (index === taskIndex) {
              const isNowComplete = !task.complete;
              return { ...task, complete: isNowComplete };
            }
            return task;
          });

          return {
            ...child,
            task: updatedTasks,
            totalPoints: updatedTasks.reduce((acc, t) => t.complete ? acc + t.points : acc, 0)
          };
        }
        return child;
      });
    });
  };

  const calculateProgress = (tasks) => {
    if (!Array.isArray(tasks)) return 0;
    const totalTask = tasks.length;
    const completedTasks = tasks.filter(task => task.complete).length;
    return (completedTasks / totalTask) * 100;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={style.homeMain}>
      <div className={style.divSettings}>
        <span className="material-symbols-outlined" style={{ fontSize: '40px' }} onClick={handleConfig}>
          settings
        </span>
      </div>
      <div className={style.homePurple}>
        {children.map(filho => (
          <div key={filho.id} style={{
            backgroundColor: '#FFFFFF',
            width: '85%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: "center",
            textAlign: "end",
            borderRadius: '1rem',
            padding: '1rem',
            margin: '1rem 2rem 0.2rem',
          }}>
            <div className={style.nameChildren}>
              <h1>{filho.nomeCrianca}</h1>
              <p>Total de pontos: {filho.totalPoints}</p>
            </div>
            <div className={style.taskChildren}>
              {filho.task.length > 0 ? (
                filho.task.map((task, index) => (
                  <form key={index}>
                    <input
                      type="checkbox"
                      checked={task.complete}
                      onChange={() => handleTaskChange(filho.id, index)}
                    />
                    <label> {task.taskName} + {task.points}</label>
                  </form>
                ))
              ) : (
                <p>Sem tarefas para exibir.</p>
              )}
            </div>
            <div className={style.progressBarContainer}>
              <div
                className={style.progressBar}
                style={{ width: `${calculateProgress(filho.task)}%` }}
              ></div>
              <p>{calculateProgress(filho.task).toFixed(0)}% concluído!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardChildren;
