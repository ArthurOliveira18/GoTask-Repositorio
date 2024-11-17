import  { useState,useEffect } from 'react';
import style from './ItensStore.module.css';
import { useNavigate } from 'react-router-dom';
const urlBenef = "http://localhost:3000/beneficios"
const urlChild = "http://localhost:3000/children"
import axios from "axios"

const ItensStore = () => {
  const navigate = useNavigate();

  const [recompensas,setRecompensas] = useState([
    
  ]);
 

  // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
  const user = JSON.parse(localStorage.getItem('user'));

  // Acessa o idResp dentro do objeto 'user'
  const idResp = user ? user.idResp : null;

  // Função para buscar os dados das crianças
  const fetchRecompensas = async () => {
    try {

      // Faz a requisição para o servidor para buscar todas as crianças
      const response = await axios.get(urlBenef); // Endpoint para buscar crianças

      // Acessa os dados retornados, que estão no response.data
      const allBenef = response.data;

      // Filtra as crianças que têm o mesmo responsavelId que o idResp
      const filteredBenef = allBenef.filter(benef => benef.RespB === parseInt(idResp));
      setRecompensas(filteredBenef);
      

    } catch (error) {
      console.error("Erro ao buscar crianças:", error);
    }
  };

  useEffect(() => {
   fetchRecompensas();
  }, []);
  
  const [children] = useState([
    { id: 1, name: 'Cristiano' },
    { id: 2, name: 'Juliana' },
    { id: 3, name: 'Enzo' },
  ]);


  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

   
 
  return (
    <div className={style.divMainItensStore}>
      <div className={style.itensBlue}>
        {recompensas.map((recomp) => (
          <div
            key={recomp.id}
            onClick={() => openModal(recomp)} // Abrindo o modal ao clicar
            style={{
              color: '#000',
              width: '40%',
              height: '20%',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              border: '5px solid #000',
              borderBottom: '10px solid #000',
              borderRadius: '1rem',
            }}
          >
            <p>{recomp.Nome_ben}</p>
            <br />
            <p>Pontos:</p>
            <h2>{recomp.pontos_ben} P</h2>
          </div>
        ))}
      </div>

      <div className={style.divButtonPoints}>
        <div>
          <button onClick={() => { navigate('/cad-beneficio') }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>
              add
            </span>
          </button>
        </div>
      </div>

      {selectedTask && (
        <div className={style.modalOverlay} onClick={closeModal}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            

          {children.map((usus) =>(
            <div className={style.divPurpleModal}>
                <div className={style.profileIcon}>
                  <span className="material-symbols-outlined" style={{fontSize:"40px"}}>person</span>
                </div>
              <div className={style.divChildrenModal}>
                <h1>{usus.name}</h1>
              </div>
            </div>
// comente apenas para dar um git push
          ))}
           

            <div className={style.divIcon}>
              <button className={style.closeButton}>Resgatar</button>
              <span className="material-symbols-outlined" onClick={() => {navigate('/edit-recompensa')}}>edit</span>
            </div>
            <button onClick={closeModal} className={style.closeButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItensStore;
