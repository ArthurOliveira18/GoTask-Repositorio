import { useState,useEffect } from 'react'
import style from './EditListTask.module.css'
import { useNavigate } from 'react-router-dom';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain'
import axios from 'axios';  // Importe o axios
const url = "http://localhost:3000/task"

const EditListTask = () => {


  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    
  ]);

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
  }, []);
  
  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divTasksDad}>
          {tasks.map((tarefas) => (
            <div key={tarefas.id} onClick={(e) => { e.preventDefault(); navigate('/edit-task-real'); }} className={style.divInfoTask}>

              <h1>{tarefas.Nome_task}</h1>
            </div>
          ))}
          <div className={style.divButtonTasks}>

            <div className={style.divIcon}>

              <button onClick={(e) => { e.preventDefault(); navigate('/TaskScreen'); }}>
                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>
                  Check
                </span>
              </button>

            </div>



          </div>


        </div>


      </div>
      <FooterMain />
    </div>
  )
}

export default EditListTask