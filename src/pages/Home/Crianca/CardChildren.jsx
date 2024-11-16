import { useState, useEffect } from "react";
import style from './CardChildren.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardChildren = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erros

  // Busca os dados das crianças e suas tarefas do backend
  useEffect(() => {
    axios.get('http://localhost:3000/childrenTask')
      .then(response => {
        console.log("Dados recebidos:", response.data); // Verifique os dados recebidos
  
        // Transformando os dados no formato esperado
        const transformedData = response.data.map(child => ({
          id: child.criancaId,
          nomeCrianca: child.nomeCrianca,
          totalPoints: child.totalPoints,
          task: [
            {
              taskName: child.taskName,
              points: child.taskPoints,
              complete: child.taskComplete === 1 // Convertendo 0/1 para true/false
            }
          ]
        }));
  
        setChildren(transformedData);
      })
      .catch(err => {
        console.error("Erro ao buscar os dados:", err);
        setError("Erro ao carregar dados. Tente novamente mais tarde.");
      })
      .finally(() => {
        setLoading(false); // Finaliza o carregamento
      });
  }, []);
  

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
              return {
                ...task,
                complete: isNowComplete
              };
            }
            return task;
          });

          return {
            ...child,
            task: updatedTasks,
            totalPoints: updatedTasks.reduce((acc, t) => {
              return t.complete ? acc + t.points : acc;
            }, 0)
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
        {children.map((filho) => (
          <div key={filho.id} style={{
            backgroundColor: '#FFFFFF',
            width: '85%',
            display: 'flex',
            justifyContent: "center",
            flexDirection: 'column',
            gap: '1rem',
            alignItems: "center",
            textAlign: "end",
            borderRadius: '1rem',
            padding: '1rem',
            marginTop: '1rem',
            marginLeft: '2rem',
            marginRight: '2rem',
            marginBottom: '.20rem',
          }}>
            <div className={style.nameChildren}>
              <h1>{filho.nomeCrianca}</h1>
              <p>Total de pontos: {filho.totalPoints}</p>
            </div>
            <div className={style.taskChildren}>
              {Array.isArray(filho.task) && filho.task.length > 0 ? (
                filho.task.map((tarefas, index) => (
                  <form key={index}>
                    <input
                      type="checkbox"
                      checked={tarefas.complete}
                      onChange={() => handleTaskChange(filho.id, index)}
                    />
                    <label htmlFor="">{tarefas.taskName} + {tarefas.points}</label>
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
