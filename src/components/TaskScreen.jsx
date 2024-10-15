
import { useState } from 'react'


import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
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
  
  return (
    <div className={style.pageContainer}>
        <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divTasksDad}>
          {tasks.map((tarefas) => (
            <div key={tarefas.id} className={style.divInfoTask}>
                
                <h1>{tarefas.task}</h1>
            </div>
          ))}
          <div className={style.divButtonTasks}>

              <div>
                <form onSubmit={(e) => { e.preventDefault(); navigate('/edit-list-task'); }}>
                  <button>
                    <span className="material-symbols-outlined" style={{fontSize:'40px' , color:'#593ACA'}}>
                      edit
                    </span>
                  </button>
                </form>
              </div>

              <div>
                <form onSubmit={(e) => { e.preventDefault(); navigate('/create-task'); }}>
                    <button> 
                      <span className="material-symbols-outlined" style={{fontSize:'41px' , color:'#593ACA'}}>
                        add
                      </span>
                    </button>
                </form>
              </div>

          </div>

            
        </div>
        
        
      </div>
      <FooterMain />
    </div>
  );
}

export default TaskScreen;
