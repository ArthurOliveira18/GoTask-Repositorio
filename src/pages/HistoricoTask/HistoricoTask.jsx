import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from './HistoricoTask.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HistoricoTask = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Arrumar a cama', isActive: true },
    { id: 2, task: 'Levar o Ozzy para passear', isActive: false },
    { id: 3, task: 'Fazer dever de casa', isActive: true },
    { id: 4, task: 'Lavar os pratos do almoço', isActive: false },
    { id: 5, task: 'Fazer o dever de matemática', isActive: true },
    { id: 6, task: 'Dormir mais cedo', isActive: false },
    { id: 7, task: 'Cuidar da sua irmã', isActive: true },
    { id: 8, task: 'Não fazer pirraça', isActive: false },
    { id: 9, task: 'Brincar com o seu irmão', isActive: true },
    { id: 10, task: 'Limpar o quarto', isActive: false },
  ]);

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.arrowMain1}>
          <Link to={'/escolha-filho'}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div></div>
          <div></div>
        </div>

        <div className={style.divTasksDad}>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`${style.divInfoTask} ${!task.isActive ? style.inactiveTask : ''}`}
              
            >
              <h1>{task.task}</h1>
            </div>
          ))}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default HistoricoTask;
