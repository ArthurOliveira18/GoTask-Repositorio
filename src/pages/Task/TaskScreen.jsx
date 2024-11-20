import { useState, useEffect } from 'react';
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './TaskScreen.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importe o axios
const url = "http://localhost:3000/task"

const TaskScreen = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([

  ]);

  const [selectedTask, setSelectedTask] = useState(null);

 
  const closeModal = () => {
    setSelectedTask(null);
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


  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divTasksDad}>
          {tasks.map((task) => (
            <div key={task.id} className={style.divInfoTask}>
              <h1>{task.Nome_task}</h1>
            </div>
          ))}


          <div className={style.divButtonTasks}>

            <button onClick={() => { navigate('/edit-list-task') }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>
                edit
              </span>
            </button>
            <button onClick={() => { navigate('/create-task') }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>
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
