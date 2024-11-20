import { useState, useEffect } from 'react';
import style from './ItensStore.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const urlBenef = "http://localhost:3000/beneficios"; // URL para buscar os benefícios
const urlChild = "http://localhost:3000/children"; // URL para buscar as crianças

const ItensStore = () => {
  const navigate = useNavigate();

  const [recompensas, setRecompensas] = useState([]);
  const [criancas, setCriancas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
  const user = JSON.parse(localStorage.getItem('user'));
  const idResp = user ? user.idResp : null;

  // Função para buscar os benefícios
  const fetchRecompensas = async () => {
    try {
      const response = await axios.get(urlBenef);
      const allBenef = response.data;
      const filteredBenef = allBenef.filter(benef => benef.RespB === parseInt(idResp));
      setRecompensas(filteredBenef);
    } catch (error) {
      console.error("Erro ao buscar benefícios:", error);
    }
  };

  // Função para buscar as crianças
  // Função para buscar as crianças
const fetchCriancas = async () => {
  try {
    const response = await axios.get(urlChild);
    const allChildren = response.data;

    console.log('Todos os dados das crianças:', allChildren); // Verifique os dados das crianças aqui

    const filteredChildren = allChildren.filter(child => child.responsavel === parseInt(idResp)); // Alterado aqui
    
    console.log('Crianças filtradas:', filteredChildren); // Verifique as crianças filtradas

    setCriancas(filteredChildren);
  } catch (error) {
    console.error("Erro ao buscar crianças:", error);
  }
};


  useEffect(() => {
    fetchRecompensas();
    fetchCriancas();
  }, []);

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
            onClick={() => openModal(recomp)} // Abre o modal ao clicar no benefício
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
          <button onClick={() => { navigate('/cad-beneficio') }} >
            <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>
              add
            </span>
          </button>
        </div>
      </div>

      {selectedTask && (
        <div className={style.modalOverlay} onClick={closeModal}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            {criancas.map((usus) => (
              <div key={usus.id} className={style.divPurpleModal}>
                <div className={style.profileIcon}>
                  <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
                </div>
                <div className={style.divChildrenModal}>
                  <h1>{usus.nomeCrianca}</h1>
                </div>
              </div>
            ))}

            <div className={style.divIcon}>
              <button className={style.closeButton}>Resgatar</button>
              <span
                className="material-symbols-outlined"
                onClick={() => { navigate('/edit-recompensa') }}
              >
                edit
              </span>
            </div>

            <button onClick={closeModal} className={style.closeButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItensStore;
