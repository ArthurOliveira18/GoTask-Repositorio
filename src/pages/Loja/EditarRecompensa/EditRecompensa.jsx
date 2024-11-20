import style from './EditRecompensa.module.css';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const urlBenef = "http://localhost:3000/beneficios";

const EditRecompensa = () => {
  // Recuperando o ID do benefício armazenado no localStorage
  const idBeneficio = localStorage.getItem('idBeneficio');
  const navigate = useNavigate();
  const [beneficio, setBeneficio] = useState({ Nome_ben: '', pontos_ben: 0 });

  // Verificando o id recebido do localStorage
  useEffect(() => {
    if (!idBeneficio) {
      console.error('ID do benefício não encontrado. A requisição não será realizada.');
      return; // Se o id não estiver disponível, não faça a requisição
    }

    const fetchBeneficio = async () => {
      try {
        console.log(`Buscando benefício com ID: ${idBeneficio}`); // Depuração para ver o ID usado na requisição
        const response = await axios.get(`${urlBenef}/${idBeneficio}`);
        console.log('Resposta da requisição:', response.data); // Depuração para mostrar o que vem do backend
        setBeneficio(response.data);
      } catch (error) {
        console.error("Erro ao carregar benefício:", error);
      }
    };

    fetchBeneficio();
  }, [idBeneficio]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeneficio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando dados para atualização:', beneficio); // Depuração antes de enviar a requisição PUT
      await axios.put(`${urlBenef}/${idBeneficio}`, beneficio);  // Atualizando o benefício com o idBeneficio correto
      alert('Benefício atualizado com sucesso!');
      navigate('/store');
    } catch (error) {
      console.error("Erro ao atualizar benefício:", error);
      alert('Erro ao atualizar o benefício.');
    }
  };

  return (
    <div className={style.pageContainerEditRecomp}>
      <HeaderMain />
      <div className={style.pageMainEditRecomp}>
        <div className={style.arrowMain1}>
          <span className="material-symbols-outlined" onClick={() => navigate('/store')}>
            arrow_back
          </span>
        </div>

        <form className={style.formRecompensa} onSubmit={handleSubmit}>
          <div className={style.divCardRecompensa}>
            <div className={style.divInputsRecompensas}>
              <h2>Benefício</h2>
              <input
                type="text"
                name="Nome_ben"
                value={beneficio.Nome_ben}
                onChange={handleInputChange}
              />
            </div>

            <div className={style.divInputsRecompensas}>
              <h2>Pontos para resgatar</h2>
              <input
                type="number"
                name="pontos_ben"
                value={beneficio.pontos_ben}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={style.divButtonRecompensa}>
            <button type="submit">Alterar</button>
          </div>
        </form>
      </div>
      <FooterMain />
    </div>
  );
};

export default EditRecompensa;
