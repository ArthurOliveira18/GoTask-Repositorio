import style from './EditRecompensa.module.css';
import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const urlBenef = "http://localhost:3000/beneficios";

const EditRecompensa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beneficio, setBeneficio] = useState({ Nome_ben: '', pontos_ben: 0 });

  // Carregar dados do benefício
  useEffect(() => {
    const fetchBeneficio = async () => {
      try {
        const response = await axios.get(`${urlBenef}/${id}`);
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
