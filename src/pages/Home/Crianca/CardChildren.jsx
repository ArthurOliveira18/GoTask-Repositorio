import { useState, useEffect } from "react";
import style from './CardChildren.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardChildren = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const idResp = user ? user.idResp : null;

  const fetchChildrenAndTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/childrenTask/${idResp}`);

      // Verifique os dados recebidos da API
      console.log('Dados recebidos do servidor:', response.data);

      const groupedData = response.data.reduce((acc, current) => {
        const existingChild = acc.find(child => child.id === current.criancaId);

        if (existingChild) {
          const taskExists = existingChild.task.some(task => task.taskName === current.taskName);
          if (!taskExists) {
            existingChild.task.push({
              taskName: current.taskName,
              points: current.taskPoints,
              complete: current.taskComplete === 1,
              taskId: current.taskId // Garantir que taskId é passado
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
              complete: current.taskComplete === 1,
              taskId: current.taskId // Garantir que taskId é passado
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
    setChildren(prevChildren =>
      prevChildren.map(child => {
        if (child.id === childId) {
          const updatedTasks = child.task.map((task, index) => {
            if (index === taskIndex) {
              return { ...task, complete: !task.complete };
            }
            return task;
          });

          return {
            ...child,
            task: updatedTasks,
            totalPoints: updatedTasks.reduce((acc, t) => t.complete ? acc + t.points : acc, 0),
          };
        }
        return child;
      })
    );
  };

  // Função handleAddTask que adiciona todas as tarefas de uma criança
  const handleAddTask = async (childId) => {
    const now = new Date();
    const dataTask = now.toISOString().slice(0, 19).replace('T', ' '); // A data da tarefa formatada
  
    try {
      const child = children.find(filho => filho.id === childId);
      const tasksToAdd = child.task.filter(task => !task.complete);
  
      if (tasksToAdd.length > 0) {
        for (const task of tasksToAdd) {
          const response = await axios.post(`http://localhost:3000/childrenTask/${idResp}/add`, {
            criancaId: childId,
            taskId: task.taskId,
            dia: null,  // Altere aqui para 'null' se não for necessária uma data ou para um valor válido
            feita: 1,   // Considerando que a tarefa foi marcada como completada
            dataTask
          });
  
          if (response.status === 201) {
            alert('Tarefa adicionada com sucesso!');
          } else {
            alert('Erro ao adicionar a tarefa.');
            break; // Caso algum erro ocorra, para o processo
          }
        }
  
        fetchChildrenAndTasks();  // Atualiza as tarefas após a adição
      } else {
        alert('Nenhuma tarefa disponível para adicionar.');
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert('Erro ao adicionar tarefa. Tente novamente.');
    }
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
                    // dad
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
            <button
              onClick={() => handleAddTask(filho.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6200EE',
                color: '#FFF',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Adicionar Tarefas
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardChildren;
