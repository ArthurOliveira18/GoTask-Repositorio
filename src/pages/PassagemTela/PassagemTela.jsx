import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from '../PassagemTela/PassagemTela.module.css'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';  
const url = "http://localhost:3000/task"

const PassagemTela = () => {

  const navigate = useNavigate();
  // Função criada apenas para utilizar o useNavigate. Não sei pq em outras paginas ele não precisa disso...
  const handleNavigatePass = () => {
    navigate('/select-days');
  };

  const [tasks, setTasks] = useState([
    
  ]);

    // Função para buscar as tarefas com axios
    const fetchTasks = async () => {
      try {
        const response = await axios.get(url); // Usando axios para pegar os dados
        setTasks(response.data); // Atualiza o estado com as tarefas
      } catch (error) {
        console.error("Erro ao buscar as tarefas:", error);
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
            <div key={tarefas.id} className={style.divInfoTask} onClick={handleNavigatePass}>

              <h1>{tarefas.Nome_task}</h1>
            </div>
          ))}
          <div className={style.divButtonTasks}>

            <div className={style.divIcon}>

              <button onClick={(e) => { e.preventDefault(); navigate('/editar-crianca'); }}>
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

export default PassagemTela