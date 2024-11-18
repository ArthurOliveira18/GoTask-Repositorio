import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from "./FamilyScreen.module.css";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const url = 'http://localhost:3000/children'

const FamilyScreen = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();


  // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
  const user = JSON.parse(localStorage.getItem('user'));

  // Acessa o idResp dentro do objeto 'user'
  const idResp = user ? user.idResp : null;

  // Função para buscar os dados das crianças
  const fetchChildren = async () => {
    try {

      // Faz a requisição para o servidor para buscar todas as crianças
      const response = await axios.get(url); // Endpoint para buscar crianças

      // Acessa os dados retornados, que estão no response.data
      const allChildren = response.data;

      // Filtra as crianças que têm o mesmo responsavelId que o idResp
      const filteredChildren = allChildren.filter(child => child.responsavel === parseInt(idResp));
      setChildren(filteredChildren);

    } catch (error) {
      console.error("Erro ao buscar crianças:", error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleNavigate = (childId) => {
    // Armazena o ID da criança no localStorage
    localStorage.setItem('selectedChildId', childId);

    // Verifica se o ID foi armazenado
    console.log("ID da criança armazenado:", localStorage.getItem('selectedChildId'));

    // Navega para a página de edição da criança
    navigate('/editar-crianca');
  };



  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        {children.map((child, index) => (
          <div
            key={index}
            className={style.userCard}
            onClick={() => handleNavigate(child.idCrianca)}  // Passa o idCrianca da criança
          >
            <div className={style.profileIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
            </div>
            <div className={style.printIcon}>
              <h1>{child.nomeCrianca}</h1>
          <button onClick={() => navigate('/ScreenPdf')}><span 
          className="material-symbols-outlined" 
          style={{ fontSize: "40px",}} 
          onClick={(e) => {
            e.stopPropagation(); // Evita que eventos adicionais do botão sejam disparados
            navigate('/ScreenPdf');}}>print</span>
        </button>
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
