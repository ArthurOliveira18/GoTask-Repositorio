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

  

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Cristiano"
    },
    {
      id: 2,
      name: "Juliana"
    },
    {
      id: 3,
      name: "Enzo"
    }
  ])

  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
  const user = JSON.parse(localStorage.getItem('user'));

  // Acessa o idResp dentro do objeto 'user'
  const idResp = user ? user.idResp : null;

  // Função para buscar os dados das crianças
  const fetchTasks = async () => {
    try {

      // Faz a requisição para o servidor para buscar todas as crianças
      const response = await axios.get(url); // Endpoint para buscar crianças

      // Acessa os dados retornados, que estão no response.data
      const allTask = response.data;

      // Filtra as crianças que têm o mesmo responsavelId que o idResp
      const filteredTask = allTask.filter(task => task.responsavel === parseInt(idResp));
      setTasks(filteredTask);

    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
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
            <div key={task.id} className={style.divInfoTask} onClick={() => openModal(task)}>
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
