import { useState, useEffect } from 'react';
import style from './EditarTaskReal.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import axios from 'axios';

const EditarTaskReal = () => {
  const idTask = localStorage.getItem('selectedTaskId');  // Pega o ID da tarefa da URL (caso seja passado via parâmetro)
  const [task, setTask] = useState({
    Nome_task: '',
    Pontos_task: '',
    RespT: ''
  });
  const navigate = useNavigate();

  // Função para buscar os dados da tarefa
  const fetchTaskById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/task/${idTask}`);
      setTask(response.data);  // Preenche os campos do formulário com os dados da tarefa
    } catch (error) {
      console.error("Erro ao buscar a tarefa:", error);
    }
  };

  // Função para editar os dados da tarefa
  const handleEditTask = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/task/${idTask}`, task);
      alert('Tarefa atualizada com sucesso!');
      navigate('/edit-list-task'); // Redireciona para a lista de tarefas
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  // UseEffect para buscar a tarefa ao carregar o componente
  useEffect(() => {
    fetchTaskById();
  }, [idTask]);

  return (
    <div className={style.pageContainer/* nome da pagina*/}>
      <HeaderMain />
      <div className={style.pageMain/* nome da pagina*/}>

        <div className={style.arrowMain1}>
          <Link to={'/edit-list-task'}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>
          <div></div>
          <div></div>
        </div>

        <form className={style.formCreateTask} onSubmit={handleEditTask}>
          {/* Essa div é a parte roxa que contém os inputs dentro dela. */}
          <div className={style.divCardCreateTask}>
            <div className={style.divInputsCreateTask}>
              <h2>Descrição da task</h2>
              <input
                type="text"
                value={task.Nome_task}
                onChange={(e) => setTask({ ...task, Nome_task: e.target.value })}
              />
            </div>

            <div className={style.divInputsCreateTask}>
              <h2>Pontos para task</h2>
              <input
                type="number"
                value={task.Pontos_task}
                onChange={(e) => setTask({ ...task, Pontos_task: e.target.value })}
              />
            </div>
          </div>

          <div className={style.divButtonCreateTask}>
            <button type='submit'>Atualizar task</button>
          </div>
        </form>
      </div>
      <FooterMain />
    </div>
  );
};

export default EditarTaskReal;
