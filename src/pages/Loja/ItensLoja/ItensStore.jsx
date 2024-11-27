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
  const [selectedTask, setSelectedTask] = useState(null); // Benefício selecionado
  const [selectedChild, setSelectedChild] = useState(null); // Criança selecionada

  const user = JSON.parse(localStorage.getItem('user'));
  const idResp = user ? user.idResp : null;

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

  const fetchCriancas = async () => {
    try {
      const response = await axios.get(urlChild);
      const allChildren = response.data;
      const filteredChildren = allChildren.filter(child => child.responsavel === parseInt(idResp));
      setCriancas(filteredChildren);
    } catch (error) {
      console.error("Erro ao buscar crianças:", error);
    }
  };

  useEffect(() => {
    fetchRecompensas();
    fetchCriancas();
  }, []);

  const openModal = (recompensa) => {
    setSelectedTask(recompensa);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setSelectedChild(null); // Limpa a seleção da criança
  };

  const handleSelectChild = (child) => {
    setSelectedChild(child.idCrianca); // Armazena o ID da criança selecionada
  };

  const handleResgatarBeneficio = async () => {
    if (!selectedChild || !selectedTask) return;
  
    // Verifica se a criança tem pontos suficientes
    const child = criancas.find(c => c.idCrianca === selectedChild);
    console.log('Criança selecionada:', child); // Verifica os dados da criança selecionada
    console.log('Pontos da criança:', child ? child.pontos : 'Criança não encontrada');
    console.log('Pontos necessários para o benefício:', selectedTask.pontos_ben);
  
    if (child && child.pontos >= selectedTask.pontos_ben) {
      try {
        console.log('Resgatando benefício para a criança...');
        console.log('Dados para o histórico de benefício:', {
          CriancaB: selectedChild,
          Beneficio: selectedTask.idBeneficio,
          dataBeneficio: new Date().toISOString(),
          valor: selectedTask.pontos_ben,
        });
  
        // Resgata o benefício no backend
        await axios.post("http://localhost:3000/historicoBeneficio", {
          CriancaB: selectedChild,
          Beneficio: selectedTask.idBeneficio,
          dataBeneficio: new Date().toISOString(),
          valor: selectedTask.pontos_ben,
        });
  
        console.log('Benefício registrado com sucesso!');
  
        // Atualiza os pontos da criança após o resgate
        console.log('Atualizando pontos da criança...');
        try {
          await axios.put(`http://localhost:3000/children/${selectedChild}`, {
            pontos: child.pontos - selectedTask.pontos_ben
          });
          console.log('Benefício registrado com sucesso!');
        } catch (error) {
          console.error("Erro ao resgatar o benefício:", error.response ? error.response.data : error);
        }
        
        // Exibe um alerta de sucesso
        alert('Benefício resgatado com sucesso!');
        closeModal(); // Fecha o modal após resgatar
      } catch (error) {
        console.error("Erro ao resgatar o benefício:", error.response || error);
      }
    } else {
      console.log('Pontos insuficientes!');
      alert('Pontos insuficientes!');
    }
  };

  const handleDeleteBeneficio = async (idBeneficio) => {
    // Confirmar se o usuário realmente deseja excluir o benefício
  const confirmed = window.confirm("Você tem certeza que deseja excluir este benefício?");

  if (confirmed) {
    try {
      // Se confirmado, faz a requisição para o backend
      await axios.delete(`http://localhost:3000/beneficios/${idBeneficio}`);
      alert('Benefício excluído com sucesso!');
      closeModal()
      // Aqui você pode atualizar a lista de benefícios ou remover o benefício da lista no estado
      setRecompensas((prevRecompensas) => prevRecompensas.filter(benef => benef.idBeneficio !== idBeneficio));
    } catch (error) {
      console.error("Erro ao excluir benefício:", error);
      alert('Erro ao excluir o benefício. Tente novamente.');
    }
  } else {
    // Se o usuário cancelar a exclusão
    alert('Exclusão cancelada.');
  }
};

  return (
    <div className={style.divMainItensStore}>
      <div className={style.itensBlue}>
        {recompensas.map((recomp) => (
          <div
            key={recomp.id}
            onClick={() => openModal(recomp)} // Passa o benefício correto para a função
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
            <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }} >
              add
            </span>
          </button>
        </div>
      </div>

      {selectedTask && (
        <div className={style.modalOverlay} onClick={closeModal}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            {criancas.map((usus) => (
              <div
                key={usus.id}
                className={`${style.divPurpleModal} ${selectedChild === usus.idCrianca ? style.selectedChild : ''}`} // Adiciona a classe se for o filho selecionado
                onClick={() => handleSelectChild(usus)}
              >
                <div className={style.profileIcon}>
                  <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
                </div>
                <div className={style.divChildrenModal}>
                  <h1>{usus.nomeCrianca}</h1>
                </div>
              </div>
            ))}
            <div className={style.divIcon}>
            <span class="material-symbols-outlined" style={{marginRight: "250px"}} onClick={() => handleDeleteBeneficio(selectedTask.idBeneficio)}>delete</span>

            
              <button className={style.closeButton} onClick={handleResgatarBeneficio}>Resgatar</button>
              <span
                className="material-symbols-outlined"
                style={{marginRight: "5px"}}
                onClick={() => {
                  navigate(`/edit-recompensa/${selectedTask.idBeneficio}`);
                }}
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
