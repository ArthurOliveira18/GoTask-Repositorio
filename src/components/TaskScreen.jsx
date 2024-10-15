import { useState } from 'react';
import HeaderMain from './HeaderMain';
import FooterMain from './FooterMain';
import style from '../styles/TaskScreen.module.css';
import { useNavigate } from 'react-router-dom';

const TaskScreen = () => {

  const navigate = useNavigate(); 

  const [tasks, setTasks] = useState([
    { id: 1, task: 'Arrumar a cama' },
    { id: 2, task: 'Levar o Ozzy para passear' },
    { id: 3, task: 'Fazer dever de casa' },
    { id: 4, task: 'Lavar os pratos do almoço' },
    { id: 5, task: 'Fazer o dever de matemática' },
    { id: 6, task: 'Dormir mais cedo' },
    { id: 7, task: 'Cuidar da sua irmã' },
    { id: 8, task: 'Não fazer pirraça' },
    { id: 9, task: 'Brincar com o seu irmão' },
    { id: 10, task: 'Se amar.' },
  ]);


    const [users, setUsers] = useState([
      {
        id:1,
        name:"Cristiano"
      },
      {
        id:2,
        name:"Juliana"
      },
      {
        id:3,
        name:"Enzo"
      }
    ])

  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divTasksDad}>
          {tasks.map((task) => (
            <div key={task.id} className={style.divInfoTask} onClick={() => openModal(task)}>
              <h1>{task.task}</h1>
            </div>
          ))}

          
          <div className={style.divButtonTasks}>

          <button onClick={() => { navigate('/edit-list-task') }}> 
                <span className="material-symbols-outlined" style={{fontSize:'40px' , color:'#593ACA'}}>
                    edit
                </span>
            </button>
            <button onClick={() => { navigate('/create-task') }}> 
                <span className="material-symbols-outlined" style={{fontSize:'40px' , color:'#593ACA'}}>
                    add
                </span>
            </button>
            
          </div>
        </div>

          
          
        
      </div>
      <FooterMain />
    </div>
  );
};

export default TaskScreen;
