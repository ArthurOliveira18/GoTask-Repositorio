import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from "./FamilyScreen.module.css";
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';

const FamilyScreen = () => {
  const [children, setChildren] = useState([]); // Estado para armazenar as crianças
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera o id do responsável logado no localStorage
    const responsavelId = localStorage.getItem('responsavelId'); // Verifique se o id do responsável está no localStorage

    if (!responsavelId) {
      alert('Responsável não encontrado!');
      return;
    }

    fetch('http://localhost:3000/children', {
      method: 'GET',
      headers: {
        'responsavel-id': responsavelId, // Envia o id do responsável no cabeçalho
      },
    })
      .then((response) => response.json())
      .then((data) => setChildren(data))
      .catch((error) => console.error('Erro ao buscar crianças:', error));
  }, []);

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        {children.map((child, index) => (
          <div key={index} className={style.userCard}>
            <div className={style.profileIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
            </div>
            <div className={style.printIcon}>
              <h1>{child.nomeCrianca}</h1>
            </div>
          </div>
        ))}

        <div>
          <button
            className={style.addButton}
            onClick={() => navigate('/register-children')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>add</span>
          </button>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default FamilyScreen;
