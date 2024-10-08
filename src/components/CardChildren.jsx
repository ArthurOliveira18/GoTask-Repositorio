import React, { useState } from "react";
import style from '../styles/CardChildren.module.css';

const CardChildren = () => {

  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Cristiano",
      task: [
        { taskName: "Arrumar a cama", points: 10, complete: false },
        { taskName: "Tirar o lixo de casa", points: 30, complete: false }
      ],
      totalPoints: 0
    },
    {
      id: 2,
      name: "Julia",
      task: [
        { taskName: "Fazer dever de matematica", points: 40, complete: false },
        { taskName: "Dormir mais cedo", points: 10, complete: false }
      ],
      totalPoints: 0
    },
    {
      id: 3,
      name: "Enzo",
      task: [
        { taskName: "Arrumar a casa", points: 80, complete: false },
        { taskName: "Ir passear com o cachorro", points: 30, complete: false }
      ],
      totalPoints: 0
    }
  ]);

  // Função para lidar com a mudança do estado da tarefa (checkbox)
  const handleTaskChange = (childId, taskIndex) => {
    setChildren(prevChildren => {
      return prevChildren.map(child => {
        if (child.id === childId) {
          const updatedTasks = child.task.map((task, index) => {
            if (index === taskIndex) {
              const isNowComplete = !task.complete; // Inverte o estado de complete
              const updatedTotalPoints = isNowComplete ? child.totalPoints + task.points : child.totalPoints - task.points; 

              return {
                ...task,
                complete: isNowComplete // Atualiza o estado de complete
              };
            }
            return task;
          });

          return {
            ...child,
            task: updatedTasks,
            totalPoints: updatedTasks.reduce((acc, t) => {
              return t.complete ? acc + t.points : acc;
            }, 0) // Calcula os pontos totais somando os pontos das tarefas completas
          };
        }
        return child; // Retorna a criança como está se o ID não for o correto
      });
    });
  };

  return (
    // Div para estilizar o layout
    <div className={style.homeMain}>
      <div className={style.homePurple}>
        {children.map((filho) => (
          <div key={filho.id} style={{
            backgroundColor: '#FFFFFF',
            width: '90%',
            height: '30%',
            display: 'flex',
            justifyContent: "center",
            flexDirection: 'column',
            gap: '1rem',
            alignItems: "center",
            textAlign: "end",
            borderRadius: '1rem'
          }}>

            <div className={style.nameChildren}>
              <h1>{filho.name}</h1>
              <p>Total de pontos: {filho.totalPoints}</p>
            </div>
            <div className={style.taskChildren}>
              {filho.task.map((tarefas, index) => (
                <form key={index}>
                  <input
                    type="checkbox"
                    checked={tarefas.complete}
                    onChange={() => handleTaskChange(filho.id, index)} // Chama handleTaskChange quando o checkbox é alterado
                  />
                  <label htmlFor=""> {tarefas.taskName} + {tarefas.points}</label>
                </form>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CardChildren;
