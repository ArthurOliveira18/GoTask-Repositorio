import style from './EditRecompensa.module.css';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import { useNavigate,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const urlBenef = "http://localhost:3000/beneficios";


import { useParams } from 'react-router-dom';

const EditRecompensa = () => {
  const { id } = useParams();  // Pega o id diretamente da URL
  const navigate = useNavigate();
  const [beneficio, setBeneficio] = useState({ Nome_ben: '', pontos_ben: 0 });

  useEffect(() => {
    if (!id) {
      console.error('ID do benefício não encontrado. A requisição não será realizada.');
      return;
    }

    const fetchBeneficio = async () => {
      try {
        console.log(`Buscando benefício com ID: ${id}`);
        const response = await axios.get(`${urlBenef}/${id}`);
        console.log('Resposta da requisição:', response.data);
        setBeneficio(response.data);
      } catch (error) {
        console.error("Erro ao carregar benefício:", error);
      }
    };

    fetchBeneficio();
  }, [id]);

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
      console.log('Enviando dados para atualização:', beneficio);
      await axios.put(`${urlBenef}/${id}`, beneficio);
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
          <Link to={'/Store'}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>
          <div></div>
          <div></div>
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
